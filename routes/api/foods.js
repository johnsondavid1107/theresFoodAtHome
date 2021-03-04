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
router.route("/updateFood/:id/:foodId")
    .put(FoodsController.update)



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
router.route("/recipes/allergy/:ingredient/:allergy")
    .get(FoodsController.findBySearchAllergy)



router.route("/userFoods/:id")
    .get(FoodsController.findById);

router.route("/allFoods").get(FoodsController.allFoods)

router.route("/getUser/:id").get(FoodsController.findOrCreate)
router.route("/addFood").post(FoodsController.addFood)
router.route("/deleteFood").put(FoodsController.trashFood)
router.route("/checkFoods").post(FoodsController.checkMe)
router.route("/clearAllFoods").put(FoodsController.emptyAll)

module.exports = router;