let mongoose = require('mongoose')
let db = require('../models')

mongoose.connect("mongodb://localhost/theresfoodathome", {
    useNewUrlParser: true,
    useFindAndModify: false
})

let userSeed = [

    {
        fireBaseId: 1,
        foodItem: [
            {
                name: "pineapple juice",
                dateOfPurchase: "2015-02-13",
                daysFresh: 20,
                spoiled: false,
                location: "pantry"
            }
        ]
    },
    {
        fireBaseId: 2,
        foodItem: [
            {
                name: "Cola",
                dateOfPurchase: "2015-02-13",
                daysFresh: 10,
                spoiled: false,
                location: "fridge"
            }
        ]
    },
    {
        fireBaseId: 3,
        foodItem: [
            {
                name: "BigMac",
                dateOfPurchase: "2015-02-13",
                daysFresh: 7,
                spoiled: false,
                location: "pantry"
            }
        ]
    },
    {
        fireBaseId: 4,
        foodItem: [
            {
                name: "milk",
                dateOfPurchase: "2015-02-13",
                daysFresh: 14,
                spoiled: false,
                location: "fridge"
            }
        ]

    },


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

