const express = require('express');
const router = express.Router();
const foodDonationController = require('../controllers/foodDonationController');

// Submit a new food donation
router.post('/submit', foodDonationController.submitDonation);

// Get all food donations
router.get('/all', foodDonationController.getAllDonations);

// Get donations by status
router.get('/status/:status', foodDonationController.getDonationsByStatus);

// Update donation status
router.put('/:id/status', foodDonationController.updateDonationStatus);

module.exports = router; 