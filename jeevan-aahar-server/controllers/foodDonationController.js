const FoodDonation = require('../models/FoodDonation');

// Submit a new food donation
exports.submitDonation = async (req, res) => {
    try {
        const donation = new FoodDonation(req.body);
        await donation.save();
        res.status(201).json(donation);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all food donations
exports.getAllDonations = async (req, res) => {
    try {
        const donations = await FoodDonation.find().sort({ createdAt: -1 });
        res.json(donations);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get donations by status
exports.getDonationsByStatus = async (req, res) => {
    try {
        const { status } = req.params;
        const donations = await FoodDonation.find({ status }).sort({ createdAt: -1 });
        res.json(donations);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update donation status
exports.updateDonationStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        
        const donation = await FoodDonation.findByIdAndUpdate(
            id,
            { 
                status,
                updatedAt: new Date()
            },
            { new: true }
        );

        if (!donation) {
            return res.status(404).json({ message: 'Donation not found' });
        }

        res.json(donation);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}; 