import React, { useContext, useEffect, useState } from "react";
import UserContext from "../utils/UserContext"
import { Col, Row, Container } from "../components/Grid";
import "./Pantry.css";
import PantryCard from "../components/PantryCard"
import FridgeCard from "../components/FridgeCard"
import InputFood from "../components/InputFood"
import API from "../utils/API"
import SuccessAlert from "../components/SuccessAlert";


function Pantry() {


  const user = useContext(UserContext);
  const [open, setOpen] = useState(true);
  const [successIndex, setSuccessIndex] = useState(0);
  const [successName, setSuccessName] = useState("");

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
          <SuccessAlert show={open} index={successIndex} name={successName} />
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
