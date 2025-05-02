const mongoose = require('mongoose');

const foodDonationSchema = new mongoose.Schema({
    donorId: {
        type: String,
        required: true
    },
    donorName: {
        type: String,
        required: true
    },
    donorEmail: {
        type: String,
        required: true
    },
    foodType: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    unit: {
        type: String,
        required: true
    },
    expiryDate: {
        type: Date,
        required: true
    },
    pickupAddress: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    pincode: {
        type: String,
        required: true
    },
    pickupTime: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'accepted', 'rejected', 'completed'],
        default: 'pending'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('FoodDonation', foodDonationSchema); 