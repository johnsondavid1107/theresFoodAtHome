import React from "react";
import { Col, Row, Container } from "../components/Grid";
import "./Pantry.css";
import PantryCard from "../components/PantryCard"
import FridgeCard from "../components/FridgeCard"


function Pantry() 
{
  return (
    <div>

      <Container>
        {/* Row 1 col 12 of page Zo*/}
        <Row>
          <Col size="md-12">

            {/* Search Bar + buttons for food - Zo */}
            <div className="input-group input-group-sm mb-3 ">
              <input type="text" className="form-control" placeholder="Add food to 😋..." />


              <button className="btn btn-warning" style= {{color:"black"}} type="button">Pantry</button>
              <button className="btn btn-info" type="button">Fridge</button>
            </div>



            {/* Pantry section, Box-1 Zo */}
          </Col>
        </Row>

        <Row>
          <Col size="md-12">
            <div className="Box-1">

              <PantryCard />


            </div>
          </Col>

        </Row>

        {/* Do not touch - Zo ensures page is responsive during laptop view*/}
        <br class="mobile" />

        <Row>
          <Col size="md-12">


            <div className="Box-2" >


              <FridgeCard />

            </div>
          </Col>
        </Row>

      </Container>

    </div>
  );
}

export default Pantry;
