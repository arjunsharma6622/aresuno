// const mongoose = require('mongoose');

// const userSchema = new mongoose.Schema({
//     name: {
//         type: String,
//         required: true
//     },
//     email: {
//         type: String,
//         required: true,
//         unique: true
//     },
//     password: {
//         type: String,
//         required: true
//     },
//     phone: {
//         type: String,
//     },
//     gender: {
//         type: String,
//         enum: ['male', 'female', 'other'],
//     },
//     place: {
//         type: String,
//     }
// });

// module.exports = mongoose.model('User', userSchema);




const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true // Ensure that the email field is unique
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String, // Keep the phone field without the unique constraint
    },
    gender: {
        type: String,
        enum: ['male', 'female', 'other'],
    },
    place: {
        type: String,
    }
});

// Validate phone uniqueness before saving
userSchema.pre('save', async function (next) {
    try {
        const phoneExists = await this.model('User').exists({ phone: this.phone });
        if (phoneExists) {
            const err = new Error('Phone number must be unique');
            next(err);
        }
        next();
    } catch (error) {
        next(error);
    }
});

module.exports = mongoose.model('User', userSchema);
