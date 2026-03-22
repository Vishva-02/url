const mongoose = require('mongoose');

const ClickSchema = new mongoose.Schema({
    urlId: {
        type: mongoose.Schema.ObjectId,
        ref: 'Url',
        required: true,
    },
    ip: {
        type: String,
    },
    userAgent: {
        type: String,
    },
    timestamp: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Click', ClickSchema);
