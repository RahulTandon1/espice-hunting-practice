const mongoose = require('mongoose')
const levelSchema = new mongoose.Schema({
    name: String, 
    author: String,
    levelText: String,
    answer: String,
    difficulty: Number,
    endpoint: {type: String, default: ""},
    date: { type: Date, default: Date.now }
});
const Level = mongoose.model('Level', levelSchema); // modelling level schema

module.exports= Level;
