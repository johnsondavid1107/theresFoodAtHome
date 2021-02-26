const router = require("express").Router();
const FoodsController = require("../../controllers/foodsController");

const db = require("../../models")



// Matches with "/api/foods"
router.route("/")
// .get(FoodsController.findAll);

//Matches with "/api/foods/user/:id"

// Matches with "/api/foods/recipes/:ingredient"
router.route("/recipes/:ingredient")
    .get(FoodsController.findBySearch);

//Finds the item within the foodItem array
router.put("/updateFood/:id/:foodName", function (req, res) {
    let index = parseInt(req.params.id);
    let foodName = req.params.foodName.toLowerCase();
    let today = new Date().toISOString();
    today = today.slice(0, 10);

    db.User.findOneAndReplace(
        { $and: [{ fireBaseId: index }, { "foodItem.name": foodName }] },
        { "foodItem.datOfPurchase": today }
    ).then(dbFood => {
        res.json(dbFood);
    }).catch(err => {
        res.json(err);
    })

})


router.post("/addFood/:id/:name/:daysFresh/:location", function (req, res) {
    let id = parseInt(req.params.id);
    let foodName = req.params.name;
    let daysFresh = parseInt(req.params.daysFresh);
    let location = req.params.location;
    let today = new Date().toISOString();
    today = today.slice(0, 10);

    //the fireBaseId number needs to be a current 
    db.User.findOneAndUpdate({ fireBaseId: id }, {
        $push: {
            foodItem: {
                name: foodName,
                dateOfPurchase: today,
                daysFresh: daysFresh,
                spoiled: false,
                location: location
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


router.route("/allFoods/:id")
    .get(FoodsController.findById);

router.route("/getUser/:id").get(FoodsController.findOrCreate)
router.route("/addFood").post(FoodsController.addFood)
router.route("/deleteFood").put(FoodsController.trashFood)

module.exports = router;