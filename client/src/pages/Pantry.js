import React from "react";
import { Col, Row, Container } from "../components/Grid";
import "./Pantry.css";
import logo from "../../src/images/placeholder-1.jpg"
import logo1 from "../../src/images/placeholder-2.jpg"
import logo2 from "../../src/images/placeholder-3.jpg"
import PantryCard from "../components/PantryCard"

function Pantry() {
  return (
    <div>

      <Container>
        {/* Row 1 col 12 of page Zo*/}
        <Row>
          <Col size="lg-12">

            {/* Search Bar + buttons for food - Zo */}
            <div className="input-group input-group-sm mb-3 ">
              <input type="text" className="form-control" placeholder="Add food to 😋..." />


              <button className="btn btn-warning" type="button">Pantry</button>
              <button className="btn btn-info" type="button">Fridge</button>
            </div>

            {/* Pantry section, Box-1 Zo */}
          </Col>
        </Row>

        <Row>
          <Col size="lg-12">
            <div className="Box-1">

              <PantryCard />

            </div>
          </Col>
        </Row>


        <Row>
          <Col size="lg-12">


            <div className="Box-2">


              <h3 className="align-Header">Fridge</h3>

              {/* Third card, Pantry- Zo */}
              <div className="card mb-3" style={{ maxWidth: "500px" }}>
                <div className="row no-gutters">
                  <div className="col-md-4">
                    <img className="food-images" src={logo2} alt="placeholder2" />
                  </div>
                  <div className="col-md-8">
                    <div className="card-body">
                      <h5 className="card-title">Zo's Cream Cheese</h5>
                      <p className="card-text" style={{ color: "white" }}>According to legend, when combined with Cinnamon bagels and Jelly a great tasting flavor is born! </p> <button type="button" className="btn btn-danger">Delete</button>
                      <p className="card-text" style={{ color: "white" }} ><small className="text-muted">Added 7 mins ago, on 2/14/2021 @ 8: 13 pm</small></p>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </Col>
        </Row>

        <br />

      </Container>

    </div>
  );
}


export default Pantry;
