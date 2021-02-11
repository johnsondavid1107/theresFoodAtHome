import React from "react";
import { Col, Row, Container } from "../components/Grid";


function Hot() 
{


    return (
      <div>
      <Container fluid>
        <Row>
          <Col size="lg-12">
          

              <div>
              <div className="navbar-item has-dropdown is-hoverable is-right">
        <a className="navbar-link" style = {{fontWeight:"bold"}}>
          Hot Inventory
        </a>

        <div className="navbar-dropdown">
          <a className="navbar-item">
            Bacon
          </a>
          <a className="navbar-item">
            Pineapples
          </a>
          <a className="navbar-item">
            Bread
          </a>
          <hr className="navbar-divider"/>
          <a className="navbar-item">
            Recommended: Bacon Pineapple Pizza 🙂 <br/>
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
    
          </Col>
        </Row>
      </Container>
    </div>
    );
  }


export default Hot;
