const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const allFoodSchema = new Schema({


    allFoods: [
        {
            name: {
                type: String
            },
            daysFresh: {
                type: Number
            }
        }
    ],





})
const allFoods = mongoose.model("allFoods", allFoodSchema);

module.exports = allFoods;

