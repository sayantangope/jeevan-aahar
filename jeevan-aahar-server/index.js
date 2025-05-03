const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 5003;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../jeevan-aahar-client'))); // Serve static files from the client directory

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/jeevanahaar';

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
  socketTimeoutMS: 45000, // Close sockets after 45s of inactivity
})
.then(() => {
  console.log('Connected to MongoDB');
  // Start server only after MongoDB connection is established
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
})
.catch(err => {
  console.error('MongoDB connection error:', err);
  process.exit(1); // Exit if MongoDB connection fails
});

// Schema for Donations
const donationSchema = new mongoose.Schema({
  foodName: { type: String, required: true },
  foodType: { type: String, required: true },
  quantity: { type: Number, required: true },
  location: { type: String, required: true },
  pickupTime: { type: Date, required: true },
  mediaFiles: [String],
  notes: String,
  status: { type: String, default: 'pending' },
  createdAt: { type: Date, default: Date.now }
});

const Donation = mongoose.model('Donation', donationSchema);

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = 'uploads';
    try {
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }
      cb(null, uploadDir);
    } catch (error) {
      cb(error);
    }
  },
  filename: (req, file, cb) => {
    try {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, uniqueSuffix + path.extname(file.originalname));
    } catch (error) {
      cb(error);
    }
  }
});

const upload = multer({ 
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
    files: 5 // Maximum 5 files
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'video/mp4'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only images and videos are allowed.'));
    }
  }
});

// API Routes
app.post('/api/donations', upload.array('mediaFiles'), async (req, res) => {
  try {
    console.log('Received donation submission request');
    console.log('Request body:', req.body);
    console.log('Files:', req.files);
    
    const { foodName, foodType, quantity, location, pickupTime, notes } = req.body;
    
    // Validate required fields
    if (!foodName || !foodType || !quantity || !location || !pickupTime) {
      console.log('Missing required fields:', { foodName, foodType, quantity, location, pickupTime });
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Validate quantity
    if (isNaN(quantity) || quantity <= 0) {
      return res.status(400).json({ error: 'Quantity must be a positive number' });
    }

    const mediaFiles = req.files ? req.files.map(file => file.path) : [];

    const donation = new Donation({
      foodName,
      foodType,
      quantity: Number(quantity),
      location,
      pickupTime: new Date(pickupTime),
      mediaFiles,
      notes
    });

    await donation.save();
    res.status(201).json(donation);
  } catch (error) {
    console.error('Error creating donation:', error);
    res.status(500).json({ 
      error: 'Failed to create donation',
      details: error.message 
    });
  }
});

app.get('/api/donations', async (req, res) => {
  try {
    const donations = await Donation.find().sort({ createdAt: -1 });
    res.json(donations);
  } catch (error) {
    console.error('Error fetching donations:', error);
    res.status(500).json({ 
      error: 'Failed to fetch donations',
      details: error.message 
    });
  }
});

app.put('/api/donations/:id', async (req, res) => {
  try {
    const { status } = req.body;
    
    // Validate status
    if (!['pending', 'completed', 'cancelled'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }

    const donation = await Donation.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!donation) {
      return res.status(404).json({ error: 'Donation not found' });
    }

    res.json(donation);
  } catch (error) {
    console.error('Error updating donation:', error);
    res.status(500).json({ 
      error: 'Failed to update donation',
      details: error.message 
    });
  }
});

// Add DELETE endpoint for donations
app.delete('/api/donations/:id', async (req, res) => {
  try {
    const donation = await Donation.findByIdAndDelete(req.params.id);
    
    if (!donation) {
      return res.status(404).json({ error: 'Donation not found' });
    }

    // Delete associated media files
    if (donation.mediaFiles && donation.mediaFiles.length > 0) {
      donation.mediaFiles.forEach(filePath => {
        try {
          fs.unlinkSync(filePath);
        } catch (err) {
          console.error('Error deleting file:', err);
        }
      });
    }

    res.json({ message: 'Donation deleted successfully' });
  } catch (error) {
    console.error('Error deleting donation:', error);
    res.status(500).json({ 
      error: 'Failed to delete donation',
      details: error.message 
    });
  }
});

// Serve static files
app.use('/uploads', express.static('uploads'));