const router = require("express").Router();
const FoodsController = require("../../controllers/foodsController");
 
// Matches with "/api/foods"
router.route("/")
    // .get(FoodsController.findAll);
 
//Matches with "/api/foods/user/:id"
router.route("/user/:id")
    .get(FoodsController.findById);
 
// Matches with "/api/foods/recipes/:ingredient"
router.route("/recipes/:ingredient")
    .get(FoodsController.findBySearch);
 
// Matches with "/api/foods/recipes/:ingredient/:diet"
router.route("/recipes/:ingredient/:diet")
    .get(FoodsController.findBySearchSpecialDiet);
 
// Matches with "/api/foods/recipes/:ingredient/:diet"
router.route("/recipes/allergy/:ingredient/:allergy")
    .get(FoodsController.findBySearchAllergy)
 
router.route("/recipes/allspec/:ingredient/:allergy/:diet")
    .get(FoodsController.findBySearchAllergySpecialDiet)
 
module.exports = router;
 
 
 
 
 

