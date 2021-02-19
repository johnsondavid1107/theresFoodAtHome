import React from "react";
import { Col, Row, Container } from "../components/Grid";
import "./Pantry.css";


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


              <button className="btn btn-warning" type="button">Pantry</button>
              <button className="btn btn-info" type="button">Fridge</button>
            </div>



            {/* Pantry section, Box-1 Zo */}
          </Col>
        </Row>

        <Row>
          <Col size="md-12">
            <div className="Box-1">

              <h3 className="align-Header">Pantry</h3>



              {/* Item 1 */}
              <button className="btn btn-danger" type="button">Delete</button>

              <div className="card">
                <div className="card-body">
                  Fruit Snacks
                </div>
              </div>

              {/* Spacing */}
              <br />

              {/* Item 2 */}
              <button className="btn btn-danger" type="button">Delete</button>

              <div className="card">
                <div className="card-body">
                  Cheese Puffs
                </div>
              </div>

              {/* Spacing */}
              <br />

              {/* Item 2 */}
              <button className="btn btn-danger" type="button">Delete</button>

              <div className="card">
                <div className="card-body">
                  Cookies
                </div>
              </div>


            </div>
          </Col>

        </Row>
        
        {/* Do not touch - Zo ensures page is responsive during laptop view*/}
        <br class="mobile" />
                
        <Row>
          <Col size="md-12">


            <div className="Box-2" >


              <h3 className="align-Header">Fridge</h3>

              {/* Item 1 */}
              <button className="btn btn-danger" type="button">Delete</button>

              <div className="card">
                <div className="card-body">
                  Eggs
                </div>
              </div>

              {/* Spacing */}
              <br />

              {/* Item 2 */}
              <button className="btn btn-danger" type="button">Delete</button>

              <div className="card">
                <div className="card-body">
                  Milk
                </div>
              </div>

              {/* Spacing */}
              <br />

              {/* Item 2 */}
              <button className="btn btn-danger" type="button">Delete</button>

              <div className="card">
                <div className="card-body">
                  Bread
                </div>
              </div>

            </div>
          </Col>
        </Row>


      </Container>

    </div>
  );
}


export default Pantry;
