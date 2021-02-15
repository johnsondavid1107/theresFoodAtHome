const router = require("express").Router();
const FoodsController = require("../../controllers/foodsController");

const db = require("../../models")



// Matches with "/api/foods"
router.route("/")
// .get(FoodsController.findAll);

//Matches with "/api/foods/user/:id"
router.route("/user/:id")
    .get(FoodsController.findById);

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

// Matches with "/api/foods/recipes/:ingredient/:diet"
router.route("/recipes/:ingredient/:diet")
    .get(FoodsController.findBySearchSpecialDiet);

// Matches with "/api/foods/recipes/:ingredient/:diet"
router.route("/recipes/allergy/:ingredient/:allergy")
    .get(FoodsController.findBySearchAllergy)

router.route("/recipes/allspec/:ingredient/:allergy/:diet")
    .get(FoodsController.findBySearchAllergySpecialDiet)


router.route("/PantryItems:id").get(FoodsController.findById)
module.exports = router;






