const mongoose = require('mongoose');

const UrlSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true,
    },
    originalUrl: {
        type: String,
        required: [true, 'Please add the original URL'],
        match: [
            /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i,
            'Please add a valid URL',
        ],
    },
    shortCode: {
        type: String,
        required: true,
        unique: true,
    },
    clicks: {
        type: Number,
        default: 0,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    expiresAt: {
        type: Date,
        default: null,
    },
});

module.exports = mongoose.model('Url', UrlSchema);
