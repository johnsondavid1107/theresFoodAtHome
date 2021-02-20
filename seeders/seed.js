let mongoose = require('mongoose')
let db = require('../models')

mongoose.connect("mongodb://localhost/theresfoodathome", {
    useNewUrlParser: true,
    useFindAndModify: false
})

let userSeed = [

    {
        fireBaseId: "5Pr0MqP0FqRYCMui1Xzx6MP1R3d2",
        foodItem: [
            {
                name: "pineapple juice",
                dateOfPurchase: "2021-02-13",
                daysFresh: 20,
                spoiled: false,
                location: "pantry"
            },
            {
                name: "Tea",
                dateOfPurchase: "2021-02-13",
                daysFresh: 14,
                spoiled: false,
                location: "pantry"
            }, {
                name: "Cola",
                dateOfPurchase: "2021-02-13",
                daysFresh: 10,
                spoiled: false,
                location: "fridge"
            },
            {
                name: "Bread",
                dateOfPurchase: "2021-02-13",
                daysFresh: 7,
                spoiled: false,
                location: "pantry"
            },
            {
                name: "Milk",
                dateOfPurchase: "2021-02-13",
                daysFresh: 14,
                spoiled: false,
                location: "fridge"
            },
            {
                name: "Eggs",
                dateOfPurchase: "2021-02-13",
                daysFresh: 14,
                spoiled: false,
                location: "fridge"
            },
            {
                name: "Yogurt",
                dateOfPurchase: "2021-02-13",
                daysFresh: 14,
                spoiled: false,
                location: "fridge"
            },
            {
                name: "Tuna",
                dateOfPurchase: "2021-02-13",
                daysFresh: 14,
                spoiled: false,
                location: "pantry"
            },
            {
                name: "noodles",
                dateOfPurchase: "2021-02-13",
                daysFresh: 14,
                spoiled: false,
                location: "pantry"
            },
            {
                name: "Nuts",
                dateOfPurchase: "2021-02-13",
                daysFresh: 14,
                spoiled: false,
                location: "pantry"
            },
            {
                name: "Salmon",
                dateOfPurchase: "2021-02-13",
                daysFresh: 14,
                spoiled: false,
                location: "fridge"
            }
        ]
    },
    {
        fireBaseId: "2",
        foodItem: [
            {
                name: "Cranberry Juice",
                dateOfPurchase: "2021-02-13",
                daysFresh: 20,
                spoiled: false,
                location: "pantry"
            },
            {
                name: "Oranges",
                dateOfPurchase: "2021-02-13",
                daysFresh: 14,
                spoiled: false,
                location: "pantry"
            }, {
                name: "Butter",
                dateOfPurchase: "2021-02-13",
                daysFresh: 10,
                spoiled: false,
                location: "fridge"
            },
            {
                name: "Potatoes",
                dateOfPurchase: "2021-02-13",
                daysFresh: 7,
                spoiled: false,
                location: "pantry"
            },
            {
                name: "Milk",
                dateOfPurchase: "2021-02-13",
                daysFresh: 14,
                spoiled: false,
                location: "fridge"
            },
            {
                name: "Whip cream",
                dateOfPurchase: "2021-02-13",
                daysFresh: 14,
                spoiled: false,
                location: "fridge"
            },
            {
                name: "Coffee",
                dateOfPurchase: "2021-02-13",
                daysFresh: 14,
                spoiled: false,
                location: "fridge"
            },
            {
                name: "Spaghetti",
                dateOfPurchase: "2021-02-13",
                daysFresh: 14,
                spoiled: false,
                location: "pantry"
            },
            {
                name: "Vienna Sausages",
                dateOfPurchase: "2021-02-13",
                daysFresh: 14,
                spoiled: false,
                location: "pantry"
            },
            {
                name: "Nuts",
                dateOfPurchase: "2021-02-13",
                daysFresh: 14,
                spoiled: false,
                location: "pantry"
            },
            {
                name: "Salami",
                dateOfPurchase: "2021-02-13",
                daysFresh: 14,
                spoiled: false,
                location: "fridge"
            }
        ]
    }



]


db.User.deleteMany({})
    .then(() => db.User.collection.insertMany(userSeed))
    .then(data => {
        console.log(data.result.n + " records inserted!!!!!!!!!");
        process.exit(0)
    })
    .catch(err => {
        console.error(err);
        process.exit(1)
    })

