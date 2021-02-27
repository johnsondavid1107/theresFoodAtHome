import React, { useContext, useEffect } from "react";
import { Col, Row, Container } from "../Grid";
import "./Pantry.css";
import PantryCard from "../PantryCard"
import FridgeCard from "../FridgeCard"
import InputFood from "../InputFood"
import API from "../../utils/API";
import UserContext from "../../utils/UserContext";



function Pantry() {
  const user = useContext(UserContext);
  console.log(user)


  useEffect(() => {
    API.getUser(user.uid).then(function (response) { console.log(response.data) })
  }, [])
  

  return (
    <div>

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
                key={user.uid} />


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
