import React, { useContext, useEffect } from "react";
import { Col, Row, Container } from "../Grid";
import "./Pantry.css";
import PantryCard from "../PantryCard"
import FridgeCard from "../FridgeCard"
import InputFood from "../InputFood"
import API from "../../utils/API";
import UserContext from "../../utils/UserContext";



function Pantry() {






  useEffect(() => {


  }, []);



  return (
    <div className="Ipad-center">

      <Container>
        {/* Row 1 col 12 of page Zo*/}


        {/* Search Bar + buttons for food - Zo */}
        <InputFood
        // currentUser={user.uid}
        // key={user.uid}
        />



        {/* Pantry section, Box-1 Zo */}




      </Container>

    </div >
  );

}

export default Pantry;
