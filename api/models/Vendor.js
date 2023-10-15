const mongoose = require('mongoose');

const VendorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        enum: ['male', 'female', 'other'],
        required: true
    },
    businesses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Business',
    }]
});

module.exports = mongoose.model('Vendor', VendorSchema);
