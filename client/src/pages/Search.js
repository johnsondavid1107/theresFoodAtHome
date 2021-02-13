import React, { useEffect, useState } from "react";
import Jumbotron from "../components/Jumbotron";
import { Col, Row, Container } from "../components/Grid";
import API from "../utils/API";
 
//THIS PAGE IS FOR RECIPE DISPLAY - NEED TO IMPORT THEIR DATA
function Search() {
  //For testing purposes this is the id of the seed (David Johnson with two items)
  const userId = 1;
  const [foods, setFoods] = useState([]);
 
  useEffect(() => {
    loadFoods(userId)
  }, []);
 
  const loadFoods = userId => {
    API.getFoods(userId)
    .then(res => {
      console.log(res.data);
      setFoods(res.data);
    })
    .catch(err => console.log(err))
  }


 
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
 

