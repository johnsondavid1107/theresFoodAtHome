let mongoose = require('mongoose')
let db = require('../models')

mongoose.connect("mongodb://localhost/theresfoodathome", {
    useNewUrlParser: true,
    useFindAndModify: false
})

let userSeed = [
    // {
    //     firstName: 'David',
    //     lastName: "Johnson",
    //     email: "dj@yahoo.com",
    //     password: "peace",
    //     userId: 5

    // },
    {
        fireBaseId: 1,
        foodItem: [
            {
                name: "pineapple juice",
                dateOfPurchase: null,
                daysFresh: 20,
                spoiled: false,
                location: "pantry"


            }
        ]

    },

    {
        fireBaseId: 5,
        foodItem: [
            {
                name: "Cola",
                dateOfPurchase: null,
                daysFresh: 10,
                spoiled: false,
                location: "fridge"


            }
        ]

    },



]
// let foodSeed = [
//     {
//         name: 'cola',
//         dateOfPurchase: null,
//         daysFresh: 9,
//         spoiled: false,
//         location: "fridge"

//     },



// ]

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

//to find all food stored in the database that belongs ot the user you need to run the db.User.find({}) and then .populate("Food") since it is under foodItem in the users schema.  after .populate("Food").then(sendAll => res.json(sendAll))
// db.Food.deleteMany({})
//     .then(() => db.Food.collection.insertMany(foodSeed))
//     .then(data => {
//         console.log(data.result.n + " records inserted!!!!!!!!!");
//         process.exit(0)
//     })
//     .catch(err => {
//         console.error(err);
//         process.exit(1)
//     })