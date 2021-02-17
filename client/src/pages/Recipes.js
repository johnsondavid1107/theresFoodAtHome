import React, { useEffect, useState } from "react";
import { Col, Row, Container } from "../components/Grid";
import API from "../utils/API";
 

function Recipes() {

  //This will be replaced by variables once firebase is up
  const userId = 1;
  const specialDiet = "";
  const allergies = "peanut";
 
 
  //All foods from the db
  const [foods, setFoods] = useState([]);
 
  //The string that will go into the API search query
  const [searchTerm, setSearchTerm] = useState("");
 
  //Will become the array of objects from user data
  const foodArray = [];
 
  //search results
  const [searchResults, setSearchResults] = useState([]);
 
  useEffect(() => {
    loadFoods(userId);
    setFoods(foodArray);
  }, []);
 
 
  const loadFoods = userId => {
    API.getFoods(userId)
      .then(res => {
        //Makes an array of objects for each food item in pantry
        let dbObject = res.data;
 
        for (let i = 0; i < dbObject.length; i++) {
 
          //get name
          let name = dbObject[i].foodItem[0].name;
 
          //get date of purchase
          let dateOfPurchase = dbObject[i].foodItem[0].dateOfPurchase;
          dateOfPurchase = new Date(dateOfPurchase);
          let location = dbObject[i].foodItem[0].location;
          let daysFresh = dbObject[i].foodItem[0].daysFresh;
 
          //Gets a spoil date for each item
          let spoilDate = new Date(dateOfPurchase.valueOf())
          spoilDate.setDate(spoilDate.getDate() + daysFresh);
 
          //Gets number of days fresh for each item - difference between today's date and the spoil date
          let today = new Date();
          let dd = String(today.getDate()).padStart(2, '0');
          let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
          let yyyy = today.getFullYear();
 
          today = mm + '/' + dd + '/' + yyyy;
          
          let total = Math.floor((new Date(spoilDate) - new Date(today))/(1000*3600*24));
 
          //Gets id - may remove this later if not needed
          let id = dbObject[i]._id;
 
          //get remaining time - still working on this
          let foodObject = {
            id: id,
            name: name,
            dateOfPurchase: dateOfPurchase,
            location: location,
            daysFresh: daysFresh,
            spoilDate: spoilDate,
            daysRemaining: total,
            location: location
          }
 
          foodArray.push(foodObject);
        }
 
        setFoods(foodArray);
 
        //On start automatically do a search for all of the foods that are going to expire in the next week
        //List must be comma separated
        let ingredients = "";
        for (let i = 0; i < foods.length; i++) {
          if (foods[i].daysRemaining >= 0 && foods[i].daysRemaining < 7) {
            ingredients += foods[i].name + ",";
          }
        }
        
        //Removes the last comma
        ingredients = ingredients.replace(/,\s*$/, "");
        setSearchTerm(ingredients);
 
        if (ingredients === "") {
          //Since no items are about to expire, show recipes for other foods
          for (let i = 0; i < foods.length; i++) {
            if (foods[i].daysRemaining >= 0) {
              ingredients += foods[i].name + ",";
            }
          }
 
          setSearchTerm(ingredients);
          
        }
        
        makeSearchTerm(searchTerm);
      })
      .catch(err => console.log(err))
  }
 
  //decides which API route to call and calls it based on ingredients as a parameter
  const makeSearchTerm = ingredients => {
    if(specialDiet === "" && allergies === ""){
      API.recipeFromIngredients(ingredients).then(res => {
        console.log(res.data);
        setSearchResults(res.data);
      })
 
    } else if (specialDiet === ""){
      API.recipeAllergy(ingredients, allergies).then(res => {
        console.log(res.data);
        setSearchResults(res.data);
      })
 
    } else {
      API.recipeSpecialDiet(ingredients, specialDiet).then(res => {
        console.log(res.data);
        setSearchResults(res.data);
      })
    }
  }
 
  return (
    <div>
      <Container fluid>
        <Row>
          <Col size="lg-12">
 
 
 
 
          </Col>
        </Row>
      </Container>
    </div>
  );
}
 
 
export default Recipes;
 

