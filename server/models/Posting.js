const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const postingSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    category: {
        type: String,
        required: true,
        trim: true,
    },
    platform: {
        type: String,
        required: true,
        trim: true,
    },
    publisher: {
        type: String,
        required: true,
        trim: true,
    },
    genre: {
        type: String,
        required: true,
        trim: true,
    },
    condition: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    postAuthor: {
        type: String,
        required: false,
        trim: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp),
    }
});

const Posting = model('Posting', postingSchema);

module.exports = Posting;