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
        return axios.post("/api/foods/checkFoods", {
            name: item.name,
            daysFresh: item.daysFresh

        })
    },
    getUser: function (id) {
        return axios.get("/api/foods/getUser/" + id)
    },
    clearAllFoods: function () {
        return axios.put("/api/foods/clearAllFoods", {

        })
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
    updateFood: function (id, foodId, newDate) {
        console.log(newDate);
        return axios.put("/api/foods/updateFood/" + id + "/" + foodId,
            { dateOfPurchase: newDate.dateOfPurchase });
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









