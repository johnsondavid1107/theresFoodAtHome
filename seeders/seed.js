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
                name: "Tea",
                daysFresh: 14
            }, {
                name: "Cola",
                daysFresh: 10
            },
            {
                name: "Bread",
                daysFresh: 7
            },
            {
                name: "Milk",
                daysFresh: 14
            },
            {
                name: "Eggs",
                daysFresh: 14
            },
            {
                name: "Yogurt",
                daysFresh: 14
            },
            {
                name: "Tuna",
                daysFresh: 14
            },
            {
                name: "noodles",
                daysFresh: 14
            },
            {
                name: "Nuts",
                daysFresh: 14
            },
            {
                name: "Salmon",
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

