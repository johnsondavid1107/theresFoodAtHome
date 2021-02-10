const db = require("../models");
const { default: fetch } = require("node-fetch");
const dotenv = require('dotenv');
dotenv.config();
const API_KEY = process.env.REACT_APP_API_KEY;

// Defining methods for the foodsController
module.exports = {
    findBySearch: function (req, res) {

        const ingredients = req.params.ingredient;

        let requestString = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredients}&number=6&apiKey=${API_KEY}`;

        fetch(requestString).then(result => {
            return result.json();
        }).then(response => res.json(response))
    }
};
