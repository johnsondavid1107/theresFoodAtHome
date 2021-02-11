import React from "react";
import { Col, Row, Container } from "../components/Grid";


function Cold() {


    return (
      <Container fluid>
        <Row>
          <Col size="lg-12">
            
              <div>

              <div>
              <div className="navbar-item has-dropdown is-hoverable is-right">
        <a className="navbar-link" style = {{fontWeight:"bold"}}>
          Cold Inventory
        </a>

        <div className="navbar-dropdown">
          <a className="navbar-item">
            Icecream, small/medium api img here backend
          </a>
          <a className="navbar-item">
            Whipcream, small/medium api img here backend
          </a>
          <a className="navbar-item">
            Strawberries, - small/medium api img here backend
          </a>
          <hr className="navbar-divider"/>
          <a className="navbar-item">
            Recommended: Strawberry Sundae 🙂
          </a>
        </div>
      </div>
    </div>

    {/* Team Footer - Zo on each page for now */}
    <footer className="footer">
                <div className="content has-text-centered">
                    <p>
                        <strong>© 2021 <span>Wait! </span>There's Food</strong> by 
                        <a href="https://github.com/johnsondavid1107/theresFoodAtHome"> Team 4 😎</a>
                      
    </p>
                </div>
            </footer>


              </div>
          </Col>
        </Row>
      </Container>
    );
  }


export default Cold;