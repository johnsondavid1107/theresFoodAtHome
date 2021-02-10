const router = require("express").Router();
const FoodsController = require("../../controllers/foodsController");

// Matches with "/api/foods"
router.route("/")

// Matches with "/api/foods/recipes/:ingredient"
router.route("/recipes/:ingredient")
    .get(FoodsController.findBySearch);


module.exports = router;
