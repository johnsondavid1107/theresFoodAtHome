const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//May not need email and password if firebase handles it.  Depending on what firebase gives, rewrite this
const userSchema = new Schema({

    firebaseId: {
        type: Number
    },
    foodItem: [
        {
            name: {
                type: String
            },
            dateOfPurchase: {
                type: Date
            },
            daysFresh: {
                type: Number
            },
            spoiled: {
                type: Boolean
            },
            location: {
                type: String
            }
        }
    ],





})
const User = mongoose.model("User", userSchema);

module.exports = User;

