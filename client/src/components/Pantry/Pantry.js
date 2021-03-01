import React, { useEffect } from "react";
import { Container } from "../Grid";
import "./Pantry.css";
import InputFood from "../InputFood"




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
