const db = require("../models");
const { default: fetch } = require("node-fetch");
const dotenv = require('dotenv');
dotenv.config();
const mongoose = require("mongoose");
const { allFoods } = require("../models");

const API_KEY = process.env.REACT_APP_API_KEY;

// Defining methods for the foodsController
module.exports = {

    //Gets all items from the pantry of a specific user - finding by fireBaseId
    findById: function (req, res) {

        // console.log(req.params.id, "line 13 controller")
        let index = req.params.id;
        db.User.find({ fireBaseId: index })
            .then(dbModel => {
                // console.log(dbModel, "line17 controller")
                res.json(dbModel);
            })
            .catch(err => {
                res.status(400).json(err);
            })
    },
    allFoods: function (req, res) {
        db.allFoods.find({}).then(foodModel => {
            // console.log(foodModel,"line29")
            res.send(foodModel)
        })
    },
    checkMe: function (req, res) {
        console.log(req.params.item, "line 34")
        let item = req.params.item
        //found on Stackoverflow, honeslty so excited that it works
        db.allFoods.find({ "allFoods.name": item }, { _id: 0, allFoods: { $elemMatch: { name: item } } }).then(function (response) {
            console.log(response, "line36")
            if (response.length === 0) {
                console.log("not enough")
                db.allFoods.update({
                    $push: {
                        allFoods: {
                            name: item,
                            daysFresh: 10
                        }
                    }
                }).then(function (response) {
                    console.log(response)
                    console.log("added new item")
                })

            } else {
                res.send("ok")
            }
        })

    },

    findOrCreate: function (req, res) {
        let user = req.params.id
        // console.log(req.params.id, "line28 controller")
        db.User.find({ fireBaseId: user }).then(
            function (response) {
                // console.log(response, "line44")
                if (response.length === 0) {
                    console.log("No user found.  Proceed to create user", req.params.id)
                    db.User.collection.insert({
                        fireBaseId: user,
                        foodItem: [
                            {

                            }
                        ]
                    }).then(dbUser => res.json(dbUser))


                } else {
                    res.json(response)
                }
            }
        )
    },
    addFood: function (req, res) {
        // console.log(req.body, "line 66")
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

        }).then(function (response) {
            console.log(response)
            res.json(response)
        })
    },
    trashFood: function (req, res) {

        console.log(req.body, "line61")
        db.User.updateOne({ fireBaseId: req.body.user }, {
            $pull: {
                foodItem: {
                    _id: req.body.selection
                }

            }

        }).then(function (response) {
            console.log(response, "line69")
            res.send(response)
        })






    },


    //Searches for recipes based on just ingredients and no allergies/special diet
    findBySearch: function (req, res) {

        const ingredients = req.params.ingredient;
        let requestString = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredients}&number=3&apiKey=${API_KEY}`;

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

    //Updates a food item
    update: function (req, res) {

        db.User.updateOne(
            { $and: [{ fireBaseId: req.params.id }, { "foodItem._id": req.params.foodId }] },
            {$set: { "foodItem.dateOfPurchase": req.body.dateOfPurchase }},
            {upsert: true}
        ).then(dbFood => res.json(dbFood))
        .catch(err => res.json(err))

    }

};






