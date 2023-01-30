const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    surname: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
    },
    issuedBook: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book',
        // type: String,
        required: false,
        // trim: true,
    },
    issuedDate: {
        type: String,
        required: false,
        trim: true,
    },
    returnDate: {
        type: String,
        required: false,
        trim: true,
    },
    subscriptionType: {
        type: String,
        required: true,
    },
    subscriptionDate: {
        type: String,
        required: true,
    }
}, {
    timestamps: true,
});

module.exports = mongoose.model('User', userSchema);