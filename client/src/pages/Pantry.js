import React, { useEffect, useState } from "react";
import Jumbotron from "../components/Jumbotron";
import { Col, Row, Container } from "../components/Grid";
import API from "../utils/API";


function Pantry() {
  //For testing purposes this is the id of the seed (David Johnson with two items)
  const userId = 1;
  const [foods, setFoods] = useState([]);
 
  useEffect(() => {
    loadFoods(userId)
  }, []);
 
  const loadFoods = userId => {
    API.getFoods(userId)
    .then(res => {
      let dbObject = res.data;
      const foodArray = [];
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
    })
    .catch(err => console.log(err))
  }
  

    return (
      <Container fluid>
        <Row>
          <Col size="md-6">
            <Jumbotron>
              <h1>Pantry</h1>
            </Jumbotron>
          </Col>
        </Row>
      </Container>
    );
  }


export default Pantry;
