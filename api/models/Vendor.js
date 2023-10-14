const mongoose = require('mongoose');

const VendorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required.']
    },
    email: {
        type: String,
        required: [true, 'Email is required.'],
        unique: [true, 'Email must be unique.']
    },
    phone: {
        type: String,
        required: [true, 'Phone number is required.'],
        unique: [true, 'Phone number must be unique.']
    },
    password: {
        type: String,
        required: [true, 'Password is required.']
    },
    gender: {
        type: String,
        enum: {
            values: ['male', 'female', 'other'],
            message: 'Invalid gender type.'
        },
        required: [true, 'Gender is required.']
    },
    businesses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Business',
    }]
});

module.exports = mongoose.model('Vendor', VendorSchema);
