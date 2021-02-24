const db = require("../models");
const { default: fetch } = require("node-fetch");
const dotenv = require('dotenv');
dotenv.config();

const API_KEY = process.env.REACT_APP_API_KEY;

// Defining methods for the foodsController
module.exports = {

    //Gets all items from the pantry of a specific user - finding by fireBaseId
    findById: function (req, res) {
        console.log("this")
        console.log(req.params.id, "line 13 controller")
        let index = req.params.id;
        db.User.find({ fireBaseId: index })
            .then(dbModel => {
                console.log(dbModel, "line17 controller")
                res.json(dbModel);
            })
            .catch(err => {
                res.status(400).json(err);
            })
    },
    findOrCreate: function (req, res) {
        let user = req.params.id
        console.log(req.params.id, "line27 controller")
        db.User.find({ fireBaseId: user }).then(
            function (response) {
                if (!response) {
                    console.log("No user found.  Proceed to create user")
                    db.User.create({ fireBaseId: req.params.id }).then(dbUser => res.json(dbUser))


                }
            }
        )
    },
    addFood: function (req, res) {
        console.log(req.body)
        db.User.update({ fireBaseId: req.body.user }, {
            $push: {
                foodItem: {
                    name: req.body.name,
                    dateOfPurchase: req.body.dateOfPurchase,
                    daysFresh: req.body.daysFresh,
                    spoiled: req.body.spoiled,
                    location: req.body.location
                }
            }

        }).then(
            console.log("status okay"),
            res.send("Added food")
        )
    },

    //Searches for recipes based on just ingredients and no allergies/special diet
    findBySearch: function (req, res) {

        const ingredients = req.params.ingredient;
        let requestString = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredients}&number=3&apiKey=${API_KEY}`;

        fetch(requestString).then(result => {
            return result.json();
        }).then(response => res.json(response))
    },

    //Searches for recipes by special diet - supports gluten free, vegetarian, vegan, pescatarian
    findBySearchSpecialDiet: function (req, res) {
        const ingredients = req.params.ingredient;
        const specDiet = req.params.diet;


        let requestString = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredients}&number=3&+&diet=${specDiet}&apiKey=${API_KEY}`;

        fetch(requestString).then(result => {
            return result.json();
        }).then(response => res.json(response))
    },

    //Searches for recipes excluding allergies - supports peanut, tree nut, and shellfish
    findBySearchAllergy: function (req, res) {
        const ingredients = req.params.ingredient;
        const allergy = req.params.allergy;

        let requestString = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredients}&number=3&+&intoleranges=${allergy}&apiKey=${API_KEY}`;

        fetch(requestString).then(result => {
            return result.json();
        }).then(response => res.json(response));
    },

    //Searches by special diet AND allergy - all same options supported 
    findBySearchAllergySpecialDiet: function (req, res) {
        const ingredients = req.params.ingredient;
        const specDiet = req.params.diet;
        const allergy = req.params.allergy;

        let requestString = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredients}&number=3&+&intoleranges=${allergy}+&diet=${specDiet}&apiKey=${API_KEY}`;

        fetch(requestString).then(result => {
            return result.json();
        }).then(response => res.json(response));
    }
};






