import React, { useEffect, useState, useContext } from "react";
import API from "../../utils/API";
import { Container, Row, Col, Button, Card, Accordion, Image, Form, Tab, Tabs } from "react-bootstrap";
import UserContext from "../../utils/UserContext";
import "./Recipe.css";
import todayDate from "../../lib/todayDate";
 
 
function Recipes() {
  //Julie's JS
  //USER INFORMATION -- will be variables from firebase
  const user = useContext(UserContext)
  let userId = user.uid;
 
  //User's allergies
  const [allergies, setAllergies] = useState("");
 
  //All foods from the db as a hook 
  const [foods, setFoods] = useState([]);
 
  //The string that will go into the API search query
  const [searchTerm, setSearchTerm] = useState("");
 
  //Will become the array of objects from user data
  let foodArray = [];
  let trueFalseArray = [];
  let freshArray = [];
  let trueFalseArrayFresh = [];
  let expiringArray = [];
  let trueFalseArrayExpiring = [];
  let expiredArray = [];
  let trueFalseArrayExpired = [];
 
  //search results
  const [searchResults, setSearchResults] = useState([]);
 
  //Handling checkbox - an array of booleans
  const [isCheckedFresh, setIsCheckedFresh] = useState([false]);
  const [isCheckedExpiring, setIsCheckedExpiring] = useState([false]);
  const [isCheckedExpired, setIsCheckedExpired] = useState([false]);
  const [isCheckedAllergies, setIsCheckedAllergies] = useState([false, false, false]);
 
  //Different list of ingredients
  const [freshList, setFreshList] = useState([]);
  const [expiringList, setExpiringList] = useState([]);
  const [expiredList, setExpiredList] = useState([]);
 
  //Different list of search terms
  const [freshSearchTerm, setFreshSearchTerm] = useState("");
  const [expiringSearchTerm, setExpiringSearchTerm] = useState("");
  const [expiredSearchTerm, setExpiredSearchTerm] = useState("");
 
  //On start up, foods loaded from database and set to a react hook
  useEffect(() => {
    loadFoods(userId);
    setFoods(foodArray);
  }, []);
 
  //Function to load up foods from user's db 
  const loadFoods = userId => {
    API.getFoods(userId)
      .then(res => {
        console.log(res.data);
        //Makes an array of objects for each food item in pantry
        let dbObject = res.data[0].foodItem;
 
        for (let i = 0; i < dbObject.length; i++) {
 
          //get name
          let name = dbObject[i].name;
 
          //get date of purchase
          let dateOfPurchase = dbObject[i].dateOfPurchase;
          if (!dateOfPurchase) {
            dateOfPurchase = new Date();
          } else {
            dateOfPurchase = new Date(dateOfPurchase);
          }
          let location = dbObject[i].location;
          let daysFresh = dbObject[i].daysFresh;
 
          //Gets a spoil date for each item
          let spoilDate = new Date(dateOfPurchase.valueOf())
          spoilDate.setDate(spoilDate.getDate() + daysFresh);
          if (spoilDate == "Invalid Date") {
            spoilDate = "";
          }
 
 
          //Gets number of days fresh for each item - difference between today's date and the spoil date
          let today = todayDate();
 
          let total = Math.floor((new Date(spoilDate) - new Date(today)) / (1000 * 3600 * 24));
          if (isNaN(total)) {
            //If it isn't a number, assume it is nonperishable and make it 100 days by default
            total = 100;
          }
 
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
 
          //Make fresh list
          if (daysFresh > 7) {
            freshArray.push(foodObject);
            trueFalseArrayFresh.push(false);
          } else if (daysFresh >= 0) {
            expiringArray.push(foodObject);
            trueFalseArrayExpiring.push(false);
          } else {
            if(!foodObject.name){
            } else {
              expiredArray.push(foodObject);
              trueFalseArrayExpired.push(false);
            }
          }
        }
 
        setFoods(foodArray);
        setIsCheckedFresh(trueFalseArrayFresh);
        setIsCheckedExpiring(trueFalseArrayExpiring);
        setIsCheckedExpired(trueFalseArrayExpired);
        setFreshList(freshArray);
        setExpiringList(expiringArray);
        setExpiredList(expiredArray);
 
      })
      .catch(err => console.log(err))
  }
 
  //decides which API route to call and calls it based on ingredients as a parameter
  const makeSearchTerm = ingredients => {
    //If no special diet and no allergies
    if (allergies === "") {
      API.recipeFromIngredients(ingredients).then(res => {
        setSearchResults(res.data);
      })
      //If allergies but no special diet
    } else {
      //They have a special diet AND allergies
      API.recipeAllergy(ingredients, allergies).then(res => {
        setSearchResults(res.data);
        //If recipe search delivers no results, do generic search
 
      })
    }
 
    if (searchResults.length) {
      let cardObject = [
        {
          name: "Sorry, no recipes found!",
          image: "https://spoonacular.com/recipeImages/133742-312x231.jpg"
        }
      ];
 
      console.log(cardObject);
      setSearchResults(cardObject);
    }
 
  }
 
 
  //Makes list of fresh items for user to add to search term
  const addToListFresh = event => {
    //Gets index of just the fresh list
    let index = event.target.id;
    if (!index) {
      index = "0";
    }
 
    let freshArray = isCheckedFresh;
 
    if (freshArray[index] === false) {
      freshArray[index] = true;
    } else {
      freshArray[index] = false;
    }
 
    setIsCheckedFresh(freshArray);
    let searchList = "";
    for (let i = 0; i < freshList.length; i++) {
      if (isCheckedFresh[i] === true) {
        searchList += freshList[i].name + ",";
      }
    }
 
    searchList = searchList.replace(/,\s*$/, "");
    setFreshSearchTerm(searchList);
  }
 
  //Makes list of expiring items for user to add to search term
  const addToListExpiring = event => {
    //Gets index of just the fresh list
    let index = event.target.id;
    if (!index) {
      index = "0";
    }
 
    let expiringArray = isCheckedExpiring;
 
    if (expiringArray[index] === false) {
      expiringArray[index] = true;
    } else {
      expiringArray[index] = false;
    }
 
    setIsCheckedExpiring(expiringArray);
    let searchList = "";
    for (let i = 0; i < expiringList.length; i++) {
      if (isCheckedExpiring[i] === true) {
        searchList += expiringList[i].name + ",";
      }
    }
 
    searchList = searchList.replace(/,\s*$/, "");
    setExpiringSearchTerm(searchList);
  }
 
  //Makes list of expired items for user to add to search term
  const addToListExpired = event => {
    //Gets index of just the fresh list
    let index = event.target.id;
    if (!index) {
      index = "0";
    }
 
    let expiredArray = isCheckedExpired;
 
    if (expiredArray[index] === false) {
      expiredArray[index] = true;
    } else {
      expiredArray[index] = false;
    }
 
    setIsCheckedExpired(expiredArray);
    let searchList = "";
    for (let i = 0; i < expiredList.length; i++) {
      if (isCheckedExpired[i] === true) {
        searchList += expiredList[i].name + ",";
      }
    }
 
    searchList = searchList.replace(/,\s*$/, "");
    setExpiredSearchTerm(searchList);
  }
 
  //Makes search term and runs API upon search button being clicked
  const runAPI = () => {
 
    //Cancatanate the strings
    let searchTerm = "";
    if (freshSearchTerm) {
      searchTerm += freshSearchTerm + ",";
    }
    if (expiringSearchTerm) {
      searchTerm += expiringSearchTerm + ",";
    }
    if (expiredSearchTerm) {
      searchTerm += expiredSearchTerm;
    }
 
    searchTerm = searchTerm.replace(/,\s*$/, "");
 
    makeSearchTerm(searchTerm);
  }
 
  //When the image is clicked, reroutes to google search for the recipe
  const imageClicked = e => {
    let item = e.target.alt;
    window.open(`https://www.google.com/search?q=${item}`);
  }
 
  
  const setAllergiesString = event => {
    // event.preventDefault();
 
    let id = event.target.id;
    id = id.slice(id.length - 1);
    id = id - 1;
 
    let allergiesYesNo = isCheckedAllergies;
    if (allergiesYesNo[id] === false) {
      allergiesYesNo[id] = true;
    } else {
      allergiesYesNo[id] = false;
    }
 
    setIsCheckedAllergies(allergiesYesNo);
 
    let allergiesString = "";
    if (isCheckedAllergies[0] === true) {
      allergiesString += "peanuts,";
    }
    if (isCheckedAllergies[1] === true) {
      allergiesString += "treenuts,";
    }
    if (isCheckedAllergies[2] === true) {
      allergiesString += "fish,";
    }
 
    allergiesString = allergiesString.replace(/,\s*$/, "");
    setAllergies(allergiesString);
  }
 
  return (
    <div>
      <Container fluid>
 
        <Card className="mt-3 text-center">
          <Card.Body>
            <Tabs className="justify-content-center" defaultActiveKey="ingredientsList" id="uncontrolled-tab-example">
              <Tab eventKey="ingredientsList" title="Ingredients">
                <Accordion defaultActiveKey="0" className="mt-3">
                  <Card>
                    <Accordion.Toggle as={Card.Header} eventKey="0" className="text-center">
                      Expiring Soon
                     </Accordion.Toggle>
                    <Accordion.Collapse eventKey="0">
                      <Card.Body>
                        <Form>
                          {['checkbox'].map((type) => (
                            <div key={`inline-${type}`} className="mb-3">
                              {expiringList.map((item, index) => {
                                return (
                                  <Form.Check onChange={addToListExpiring} inline label={item.name} type={type} id={index} />
                                );
                              })}
                            </div>
                          ))}
                        </Form>
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>
                </Accordion>
                <Accordion defaultActiveKey="0">
                  <Card>
                    <Accordion.Toggle as={Card.Header} eventKey="0" className="text-center">
                      Fresh
                     </Accordion.Toggle>
                    <Accordion.Collapse eventKey="0">
                      <Card.Body>
                        <Form>
                          {['checkbox'].map((type) => (
                            <div key={`inline-${type}`} className="mb-3">
                              {freshList.map((item, index) => {
                                return (
                                  <Form.Check onChange={addToListFresh} inline label={item.name} type={type} id={index} />
                                );
                              })}
                            </div>
                          ))}
                        </Form>
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>
                </Accordion>
                <Accordion defaultActiveKey="0" >
                  <Card>
                    <Accordion.Toggle as={Card.Header} eventKey="1" className="text-center">
                      Expired
                     </Accordion.Toggle>
                    <Accordion.Collapse eventKey="1">
                      <Card.Body>
                        <Form>
                          {['checkbox'].map((type) => (
                            <div key={`inline-${type}`} className="mb-3">
                              {expiredList.map((item, index) => {
                                return (
                                  <Form.Check onChange={addToListExpired} inline label={item.name} type={type} id={index} />
                                );
                              })}
                            </div>
                          ))}
                        </Form>
                      </Card.Body>
                    </Accordion.Collapse>
                    <Button onClick={runAPI} variant="primary">Submit</Button>{' '}
                  </Card>
                </Accordion>
              </Tab>
              <Tab eventKey="allergy" title="Allergy">
                <Accordion defaultActiveKey="0" className="mt-3">
                  <Card>
                    <Accordion.Toggle as={Card.Header} eventKey="0" className="text-center">
                      Options
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="0">
                      <Card.Body>
                        <Form>
                          {['checkbox'].map((type) => (
                            <div key={`inline-${type}`} className="mb-3">
                              <Form.Check onChange={setAllergiesString} inline label="Peanuts" type={type} id={`inline-${type}-a1`} />
                              <Form.Check onChange={setAllergiesString} inline label="Tree nuts" type={type} id={`inline-${type}-a2`} />
                              <Form.Check onChange={setAllergiesString} inline label="Fish" type={type} id={`inline-${type}-a3`} />
                            </div>
                          ))}
                        </Form>
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>
                </Accordion>
              </Tab>
            </Tabs>
          </Card.Body>
        </Card>
 
        <Container fluid className="mt-3">
          <Row>
            {searchResults.map((result, index) => {
              return (
                <Col className="col-4" xs={6} md={4} key={index}>
                  <Card>
                    <Image className="food-images" onClick={imageClicked} src={result.image} alt={result.title} rounded />
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
 
 
 
 
 
 
 

