import axios from "axios";
//make Async to use 
export default {
 
    //Gets all food from the user's pantry
    getFoods: function (id) {
        return axios.get("/api/foods/userFoods/" + id);
    },
    getAllFoods: function () {
        return axios.get("/api/foods/allFoods")
    },
    checkAllFoods: function (item) {
        return axios.get("/api/foods/checkFoods/" + item)
    },
    getUser: function (id) {
        return axios.get("/api/foods/getUser/" + id)
    },
    makeFood: function (food) {
        return axios.post("/api/foods/addFood", {
            user: food.user,
            name: food.name,
            dateOfPurchase: food.dateOfPurchase,
            daysFresh: food.daysFresh,
            spoiled: food.spoiled,
            location: food.location
        })
    },
    deleteFood: function (food) {
        return axios.put("/api/foods/deleteFood", {
            selection: food.deleteFood,
            user: food.user
 
 
        })
    },
    //Updates the database with a new date
    updateFood: function(id, foodName){
        return axios.put(`/updateFood/${id}/${foodName}`);
    },
    //searches for recipes - just from ingredients, no other 
    recipeFromIngredients: function (ingredients) {
        return axios.get("/api/foods/recipes/" + ingredients);
    },
    //Searches for recipes from ingredients and allergies
    recipeAllergy: function (ingredients, allergy) {
        return axios.get("/api/foods/recipes/allergy/" + ingredients + "/" + allergy);
    }
};
 
 
 
 
 
 
 
 

