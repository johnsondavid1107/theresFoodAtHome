import React, { useContext, useEffect, useState } from "react";
import UserContext from "../utils/UserContext"
import { Col, Row, Container } from "../components/Grid";
import "./Pantry.css";
import PantryCard from "../components/PantryCard"
import FridgeCard from "../components/FridgeCard"
import InputFood from "../components/InputFood"
import API from "../utils/API"



function Pantry() {


  const user = useContext(UserContext);



  useEffect(() => {

    API.getUser(user.uid).then(function (response) { console.log(response.data) })
  }, []);

  const getSuccessInfo = (index, name) => {
    console.log(index);
    console.log(name);
  }

  return (
    <div className= "Ipad-center">

      <Container>
        {/* Row 1 col 12 of page Zo*/}


        {/* Search Bar + buttons for food - Zo */}
        <InputFood
          currentUser={user.uid}
          key={user.uid} />

      

        {/* Pantry section, Box-1 Zo */}


        <Row>
          <Col size="md-12">
            <div className="Box-1">

              <PantryCard currentUser={user.uid}
                key={user.uid} 
                getSuccessInfo={getSuccessInfo}/>


            </div>
          </Col>

        </Row>

        {/* Do not touch - Zo ensures page is responsive during laptop view*/}
        <br className="mobile" />

        <Row>
          <Col size="md-12">


            <div className="Box-2" >


              <FridgeCard
                currentUser={user.uid}
                key={user.uid}
              />

            </div>
          </Col>
        </Row>

      </Container>

    </div >
  );

}

export default Pantry;
