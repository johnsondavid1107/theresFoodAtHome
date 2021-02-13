const router = require("express").Router();
const FoodsController = require("../../controllers/foodsController");
const db = require("../../models")

// Matches with "/api/foods"
router.route("/")

// Matches with "/api/foods/recipes/:ingredient"
router.route("/recipes/:ingredient")
    .get(FoodsController.findBySearch);




router.post("/addFood", function (req, res) {
    //the fireBaseId number needs to be a current 
    db.User.findOneAndUpdate({ fireBaseId: 1 }, {
        $push: {
            foodItem: {
                name: "Stew",
                dateOfPurchase: null,
                daysFresh: 5,
                spoiled: false,
                location: "pantry"
            }
        }

    }).then(function (response) {
        console.log(response)
        res.json(response)
    })

})
module.exports = router;
