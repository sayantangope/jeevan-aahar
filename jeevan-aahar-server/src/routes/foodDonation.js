const express = require('express');
const router = express.Router();
const FoodDonation = require('../models/FoodDonation');

// Submit a new food donation
router.post('/submit', async (req, res) => {
    try {
        // Parse FormData
        const data = {};
        for (let pair of req.body.entries()) {
            data[pair[0]] = pair[1];
        }

        // Create donation object
        const donation = new FoodDonation({
            donorName: data.donorName,
            foodName: data.foodName,
            foodType: data.foodType,
            quantity: parseInt(data.quantity),
            location: data.location,
            pickupTime: data.pickupTime,
            notes: data.notes,
            status: 'pending'
        });

        // Save donation
        await donation.save();
        
        // Handle media files if any
        if (req.body.has('mediaFiles')) {
            const mediaFiles = [];
            let i = 0;
            while (req.body.has(`mediaFiles[${i}]`)) {
                mediaFiles.push(req.body.get(`mediaFiles[${i}]`));
                i++;
            }
            donation.mediaFiles = mediaFiles;
            await donation.save();
        }

        res.status(201).json({ message: 'Donation submitted successfully', donation });
    } catch (error) {
        console.error('Error:', error);
        res.status(400).json({ message: 'Error submitting donation', error: error.message });
    }
});

// Get all food donations
router.get('/all', async (req, res) => {
    try {
        const donations = await FoodDonation.find().sort({ createdAt: -1 });
        res.json(donations);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching donations', error: error.message });
    }
});

// Get donations by status
router.get('/status/:status', async (req, res) => {
    try {
        const donations = await FoodDonation.find({ status: req.params.status }).sort({ createdAt: -1 });
        res.json(donations);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching donations', error: error.message });
    }
});

// Update donation status
router.put('/:id/status', async (req, res) => {
    try {
        const donation = await FoodDonation.findByIdAndUpdate(
            req.params.id,
            { status: req.body.status },
            { new: true }
        );
        res.json({ message: 'Status updated successfully', donation });
    } catch (error) {
        res.status(400).json({ message: 'Error updating status', error: error.message });
    }
});

module.exports = router; 