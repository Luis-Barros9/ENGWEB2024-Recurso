const mongoose = require('mongoose');

const livroSchema = new mongoose.Schema({
    _id: Number,
    title: String,
    series: String,
    author: String,
    rating: Number,
    description: String,
    language: String,
    isbn: Number,
    genres: [String],
    characters: [String],
    bookFormat: String,
    edition: String,
    pages: Number,
    publisher: String,
    publishDate: String,
    awards: [String],
    numRatings: Number,
    ratingsByStars: [Number],
    likedPercent: Number,
    setting: [String],
    coverImg: String,
    bbeScore: Number,
    bbeVotes: Number,
    price: Number
});


module.exports = mongoose.model('livros', livroSchema);

