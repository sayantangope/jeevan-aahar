const express = require('express');
const router = express.Router();
const FoodDonation = require('../models/FoodDonation');

// Submit a new food donation
router.post('/submit', async (req, res) => {
    try {
        const donation = new FoodDonation(req.body);
        await donation.save();
        res.status(201).json({ message: 'Donation submitted successfully', donation });
    } catch (error) {
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