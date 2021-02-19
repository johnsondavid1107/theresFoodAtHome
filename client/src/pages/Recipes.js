import React, { useEffect, useState } from "react";
import logo2 from "../../src/images/FaviconZo.ico.png";
import API from "../utils/API";

import { Container, Row, Col, Button, Card, Accordion, Image, Form } from "react-bootstrap";


function Recipes() {
  //Julie's JS
  //USER INFORMATION -- will be variables from firebase
  const userId = 1;
  const specialDiet = "";
  const allergies = "peanut";


  //All foods from the db as a hook 
  const [foods, setFoods] = useState([]);

  //The string that will go into the API search query
  const [searchTerm, setSearchTerm] = useState("");

  //Will become the array of objects from user data
  let foodArray = [];
  let trueFalseArray = [];

  //search results
  const [searchResults, setSearchResults] = useState([]);

  //Handling checkbox - an array of booleans
  const [isChecked, setIsChecked] = useState([false]);

  //On start up, foods loaded from database and set to a react hook
  useEffect(() => {
    loadFoods(userId);
    setFoods(foodArray);
  }, []);

  //Function to load up foods from user's db 
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

          let total = Math.floor((new Date(spoilDate) - new Date(today)) / (1000 * 3600 * 24));

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
          trueFalseArray.push(false);
        }

        setFoods(foodArray);
        setIsChecked(trueFalseArray);

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
            if (ingredients === "") {
              ingredients = "eggs,onion,flour";
            }
          }
          ingredients = ingredients.replace(/,\s*$/, "");
          setSearchTerm(ingredients);
        }
        makeSearchTerm(searchTerm);
      })
      .catch(err => console.log(err))
  }

  //decides which API route to call and calls it based on ingredients as a parameter
  const makeSearchTerm = ingredients => {
    //If no special diet and no allergies
    if (specialDiet === "" && allergies === "") {
      API.recipeFromIngredients(ingredients).then(res => {
        console.log(res.data);
        setSearchResults(res.data);
      })
      //If allergies but no special diet
    } else if (specialDiet === "") {
      API.recipeAllergy(ingredients, allergies).then(res => {
        console.log(res.data);
        setSearchResults(res.data);
      })

    } else {
      //If special diet but no allergies
      API.recipeSpecialDiet(ingredients, specialDiet).then(res => {
        console.log(res.data);
        setSearchResults(res.data);
      })
    }
  }


  let newSearchIngredients = "";
  const addToList = e => {
    const item = e.target.name;
    const index = e.target.id;
    //On click, change the [index] item in isChecked array from false to true OR from true to false
    trueFalseArray = isChecked;
    if(trueFalseArray[index] === false){
      trueFalseArray[index] = true;
    } else {
      trueFalseArray[index] = false;
    }
    setIsChecked(trueFalseArray);

    //For all items where the value is "true", add that item to the search list
    let searchList = "";
    for(let i=0; i<foods.length; i++){
      if(isChecked[i] === true){
        searchList += foods[i].name + ",";
      }
    }

    //Remove last comma from list
    searchList = searchList.replace(/,\s*$/, "");
    makeSearchTerm(searchList);
    
  }


  return (
    <div>
      <Container fluid>

        <Accordion className="mt-3" defaultActiveKey="0">
          <Card>
            <Accordion.Toggle as={Card.Header} eventKey="0" className="text-center">
              Ingredients
    </Accordion.Toggle>
            <Accordion.Collapse eventKey="0">
              <Card.Body>
                <Form>
                  <Form>
                    {['checkbox'].map((type) => (
                      <div key={`inline-${type}`} className="mb-3">
                        {foods.map((item, index) => {
                          return (
                            <Form.Check onChange={addToList} inline label={item.name} name={item.name} type={type} id={index} key={index} />
                          );
                        })}
                      </div>
                    ))}
                  </Form>
                </Form>
              </Card.Body>

            </Accordion.Collapse>
          </Card>
        </Accordion>

        <Container fluid className="mt-3">
          <Row>
            {searchResults.map((result, index) => {
              return (
                <Col className="col-4" xs={6} md={4} key={index}>
                  <Card>
                    {/* <img className="food-images card-img-top" src={logo2} alt="placeholder2"/> */}
                    <Image className="food-images" src={result.image} alt={result.title} rounded />
                    <Card.Body>
                      <h5>{result.title}</h5>
                    </Card.Body>
                  </Card>
                </Col>
              )
            })}
          </Row>
        </Container>



      </Container>
    </div>
  );
}

export default Recipes;
