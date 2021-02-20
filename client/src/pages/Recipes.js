import React, { useEffect, useState, useContext } from "react";
import API from "../utils/API";
import { Container, Row, Col, Button, Card, Accordion, Image, Form, Tab, Tabs } from "react-bootstrap";
import UserContext from "../utils/UserContext";


function Recipes() {
  //Julie's JS
  //USER INFORMATION -- will be variables from firebase

  const user = useContext(UserContext)
  const userId = user.uid;
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
        //Makes an array of objects for each food item in pantry
        let dbObject = res.data[0].foodItem;


        for (let i = 0; i < dbObject.length; i++) {

          //get name
          let name = dbObject[i].name;


          //get date of purchase
          let dateOfPurchase = dbObject[i].dateOfPurchase;
          dateOfPurchase = new Date(dateOfPurchase);
          let location = dbObject[i].location;
          let daysFresh = dbObject[i].daysFresh;

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
        setSearchResults(res.data);
      })
      //If allergies but no special diet
    } else if (specialDiet === "") {
      API.recipeAllergy(ingredients, allergies).then(res => {
        setSearchResults(res.data);
        //If recipe search delivers no results, do generic search

      })
    }
    else if (allergies === "") {
      //If special diet but no allergies
      API.recipeSpecialDiet(ingredients, specialDiet).then(res => {
        setSearchResults(res.data);
        //If recipe search delivers no results, do generic search

      })

    }
    else {
      //They have a special diet AND allergies
      API.recipeSpecDietAllergy(ingredients, specialDiet, allergies).then(res => {
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
      ]
      setSearchResults(cardObject);
    }

  }


  //Adds items that are checked to the list of ingredients to search for
  const addToList = e => {
    const index = e.target.id;

    //On click, change the [index] item in isChecked array from false to true OR from true to false
    trueFalseArray = isChecked;
    if (trueFalseArray[index] === false) {
      trueFalseArray[index] = true;
    } else {
      trueFalseArray[index] = false;
    }
    setIsChecked(trueFalseArray);

    //For all items where the value is "true", add that item to the search list
    let searchList = "";
    for (let i = 0; i < foods.length; i++) {
      if (isChecked[i] === true) {
        searchList += foods[i].name + ",";
      }
    }
    //Remove last comma from list
    searchList = searchList.replace(/,\s*$/, "");
    makeSearchTerm(searchList);
  }

  //When the image is clicked, reroutes to google search for the recipe
  const imageClicked = e => {
    let item = e.target.alt;
    window.open(`https://www.google.com/search?q=${item}`);
  }

  return (
    <div>
      <Container fluid>

      <Card className="mt-3 text-center">
          <Card.Body>
            <Tabs  className="justify-content-center"defaultActiveKey="ingredientsList" id="uncontrolled-tab-example">
              <Tab eventKey="ingredientsList" title="Ingredients">
                <Accordion defaultActiveKey="0" className="mt-3">
                  <Card>
                    <Accordion.Toggle as={Card.Header} eventKey="0" className="text-center">
                      Fresh
                     </Accordion.Toggle>
                    <Accordion.Collapse eventKey="0">
                      <Card.Body>
                        <Form>
                          <Form>
                            {['checkbox'].map((type) => (
                              <div key={`inline-${type}`} className="mb-3">
                                <Form.Check inline label="Ingredient 1" type={type} id={`inline-${type}-1`} />
                                <Form.Check inline label="Ingredient 2" type={type} id={`inline-${type}-2`} />
                                <Form.Check inline label="Ingredient 3" type={type} id={`inline-${type}-3`} />
                                <Form.Check inline label="Ingredient 4" type={type} id={`inline-${type}-4`} />
                              </div>
                            ))}
                          </Form>
                        </Form>
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>
                </Accordion>
                <Accordion defaultActiveKey="0" >
                  <Card>
                    <Accordion.Toggle as={Card.Header} eventKey="1" className="text-center">
                      Expiring Soon
                     </Accordion.Toggle>
                    <Accordion.Collapse eventKey="1">
                      <Card.Body>
                        <Form>
                          <Form>
                            {['checkbox'].map((type) => (
                              <div key={`inline-${type}`} className="mb-3">
                                <Form.Check inline label="Ingredient 1" type={type} id={`inline-${type}-1`} />
                                <Form.Check inline label="Ingredient 2" type={type} id={`inline-${type}-2`} />
                                <Form.Check inline label="Ingredient 3" type={type} id={`inline-${type}-3`} />
                                <Form.Check inline label="Ingredient 4" type={type} id={`inline-${type}-4`} />
                              </div>
                            ))}
                          </Form>
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
                          <Form>
                            {['checkbox'].map((type) => (
                              <div key={`inline-${type}`} className="mb-3">
                                <Form.Check inline label="Ingredient 1" type={type} id={`inline-${type}-1`} />
                                <Form.Check inline label="Ingredient 2" type={type} id={`inline-${type}-2`} />
                                <Form.Check inline label="Ingredient 3" type={type} id={`inline-${type}-3`} />
                                <Form.Check inline label="Ingredient 4" type={type} id={`inline-${type}-4`} />
                              </div>
                            ))}
                          </Form>
                        </Form>
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>
                </Accordion>
              </Tab>
              <Tab eventKey="specialDiet" title="Special Diet">
                <Accordion defaultActiveKey="0" className="mt-3">
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
                                <Form.Check inline label="Ingredient 1" type={type} id={`inline-${type}-1`} />
                                <Form.Check inline label="Ingredient 2" type={type} id={`inline-${type}-2`} />
                                <Form.Check inline label="Ingredient 3" type={type} id={`inline-${type}-3`} />
                                <Form.Check inline label="Ingredient 4" type={type} id={`inline-${type}-4`} />
                              </div>
                            ))}
                          </Form>
                        </Form>
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>
                </Accordion>
              </Tab>
              <Tab eventKey="allergy" title="Allergy">
                <Accordion defaultActiveKey="0" className="mt-3">
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
                                <Form.Check inline label="Ingredient 1" type={type} id={`inline-${type}-1`} />
                                <Form.Check inline label="Ingredient 2" type={type} id={`inline-${type}-2`} />
                                <Form.Check inline label="Ingredient 3" type={type} id={`inline-${type}-3`} />
                                <Form.Check inline label="Ingredient 4" type={type} id={`inline-${type}-4`} />
                              </div>
                            ))}
                          </Form>
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
                    {/* <img className="food-images card-img-top" src={logo2} alt="placeholder2"/> */}
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
