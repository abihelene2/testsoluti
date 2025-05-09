const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    title: { type: String, required: true },
    genre: { type: String, required: false },
    year: { type: Number, required: false },
}, { timestamps: true });

module.exports = mongoose.model('Movie', movieSchema);
