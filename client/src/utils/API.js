import axios from "axios";
//make Async to use 
export default {
    getPantryItems: function (id) {
        return axios.get("/api/foods/PantryItems/" + id)
    },
    //Gets all food from the user's pantry
    getFoods: function (id) {
        return axios.get("/api/foods/user/" + id);
    },
    //searches for recipes - just from ingredients, no other 
    recipeFromIngredients: function (ingredients) {
        return axios.get("/api/foods/recipes/" + ingredients);
    },
    //Searches for recipes from ingredient and special diet
    recipeSpecialDiet: function (ingredients, specialDiet) {
        return axios.get("/api/foods/recipes/" + ingredients + "/" + specialDiet);
    },
    //Searches for recipes from ingredients and allergies
    recipeAllergy: function (ingredients, allergy) {
        return axios.get("/api/foods/recipes/allergy/" + ingredients + "/" + allergy);
    },
    //Searches for recipes from ingredients AND special diet
    recipeSpecDietAllergy: function (ingredients, specialDiet, allergy) {
        return axios.get("/api/foods/recipes/allspec/" + ingredients + "/" + allergy + "/" + specialDiet);
    }
};







