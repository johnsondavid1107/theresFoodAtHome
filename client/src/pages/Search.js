import React, { useEffect, useState } from "react";
import Jumbotron from "../components/Jumbotron";
import { Col, Row, Container } from "../components/Grid";
import API from "../utils/API";
 
//THIS PAGE IS FOR RECIPE DISPLAY - NEED TO IMPORT THEIR DATA
function Search() {

  //This will be replaced by variables once firebase is up
  const userId = 1;
  const specialDiet = "";
  const allergies = "peanut";

  //All foods from the db
  const [foods, setFoods] = useState([]);

  //The string that will go into the API search query
  const[searchTerm, setSearchTerm] = useState("");

  //Will become the array of objects from user data
  const foodArray = [];

  useEffect(() => {
    loadFoods(userId);
    setFoods(foodArray);
  }, []);

 
  const loadFoods = userId => {
    API.getFoods(userId)
    .then(res => {
      //Makes an array of objects for each food item in pantry
      let dbObject = res.data;

      for(let i=0; i<dbObject.length; i++){

        //get name
        let name = dbObject[i].foodItem[0].name;

        //get date of purchase
        let dateOfPurchase = dbObject[i].foodItem[0].dateOfPurchase;
        dateOfPurchase = new Date(dateOfPurchase);
        let location = dbObject[i].foodItem[0].location;
        let daysFresh = dbObject[i].foodItem[0].daysFresh;

        //Gets a spoil date for each item
        let spoilDate = new Date(dateOfPurchase.valueOf())
        spoilDate.setDate(spoilDate.getDate()+daysFresh);

        //Gets number of days fresh for each item - difference between today's date and the spoil date
        let total = Date.parse(spoilDate) - Date.parse(new Date());
        total = Math.floor(total/(1000*3600*24));

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
    })
    .catch(err => console.log(err))
  }

  const startSearchTerm = array => {
    console.log(array.length);

  }

  //On start of page, set search parameters equal to the foods that are due to spoil
  startSearchTerm(foods);

  
  return (
    <Container fluid>
      <Row>
        <Col size="md-6">
          <Jumbotron>
            <h1>Search</h1>
          </Jumbotron>
        </Col>
      </Row>
    </Container>
  );
}
 
 
export default Search;
 

