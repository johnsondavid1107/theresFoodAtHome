let mongoose = require('mongoose')
let db = require('../models')

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/theresfoodathome", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
});


let foodSeed = [

    {

        allFoods: [
            {
                name: "pineapple juice",
                daysFresh: 20
            },
            {
                name: "tea",
                daysFresh: 14
            }, {
                name: "cola",
                daysFresh: 10
            },
            {
                name: "bread",
                daysFresh: 7
            },
            {
                name: "milk",
                daysFresh: 14
            },
            {
                name: "eggs",
                daysFresh: 14
            },
            {
                name: "yogurt",
                daysFresh: 14
            },
            {
                name: "tuna",
                daysFresh: 14
            },
            {
                name: "noodles",
                daysFresh: 14
            },
            {
                name: "nuts",
                daysFresh: 14
            },
            {
                name: "salmon",
                daysFresh: 14
            }
        ]
    }



]


// db.allFoods.deleteMany({})
//     .then(() =>

db.allFoods.collection.insertMany(foodSeed)
    .then(data => {
        console.log(data.result.n + " records inserted!!!!!!!!!");
        process.exit(0)
    })
    .catch(err => {
        console.error(err);
        process.exit(1)
    })

