const mongoose = require('mongoose');

const BusinessSchema = new mongoose.Schema({
    name: {
        type: String,
        required: "Enter ame"
    },
    type: {
        type: String,
        enum: ['service', 'manufacturing'],
        required: true
    },
    profileImg: {
        type: String,
        // required: true
    },
    vendorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vendor',
        // required: true
    },
    mainCategory: {
        type: String,
        // required: true
    },
    subCategory: {
        type: String,
        // required: true
    },
    address: {
        place: {
            type: String,
            // required: true
        },
        pincode: {
            type: String,
            // required: true
        },
        latitude: {
            type: Number,
            // required: true
        },
        longitude: {
            type: Number,
            // required: true
        }
    },
    phone: {
        type: String,
        // required: true
    },
    timing: {
        type: String,
        // required: true
    },
    posts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    }],
    photosGallery: [{
        type: String
    }],
    modeOfPayment: [{
        type: String,
        // required: true
    },],
    ratingsReviews: [{
        rating: {
            type: Number,
            // required: true
        },
        review: {
            type: String,
            // required: true
        }
    }],
    socialLinks: {
        facebook: {
            type: String
        },
        twitter: {
            type: String
        },
        instagram: {
            type: String
        }
    },
    faqs: [{
        question: {
            type: String,
            // required: true
        },
        answer: {
            type: String,
            // required: true
        }
    }]
});

module.exports = mongoose.model('Business', BusinessSchema);




