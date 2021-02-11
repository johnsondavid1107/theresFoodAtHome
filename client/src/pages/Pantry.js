import React from "react";
import { Col, Row, Container } from "../components/Grid";


function Pantry() 
{
    return (
      <div>

      <Container fluid className = "tab-container">
        <Row>
          <Col className = "tab-container"size="lg-12">
          
          <div>
              <div className="navbar-item has-dropdown is-hoverable is-right">
        <a className="navbar-link" style = {{fontWeight:"bold"}}>
          Current Pantry Items
        </a>

        <div className="navbar-dropdown">
          <a className="navbar-item">
            Eggs
          </a>
          <a className="navbar-item">
            Bread
          </a>
          <a className="navbar-item">
            Cheese
          </a>
          <hr className="navbar-divider"/>
          <a className="navbar-item">
            Recommended: A Krabby Patty 🙂
          </a>
        </div>
      </div>
    </div>

    {/* Team Footer - Zo on each for now */}
    <footer className="footer">
                <div className="content has-text-centered">
                    <p>
                        <strong>© 2021 <span>Wait! </span>There's Food</strong> by 
                        <a href="https://github.com/johnsondavid1107/theresFoodAtHome"> Team 4 😎</a>
                      
    </p>
                </div>
            </footer>

          </Col>
        </Row>
      </Container>

      </div>
    );
}


export default Pantry;
