const mongoose = require('mongoose');

const RecipeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    ingredients: {
        type: Array,
        required: true
    },
    instruction: {
        type: String,
        required: true
    },
    coverImage: {
        type: String
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Recipe', RecipeSchema);