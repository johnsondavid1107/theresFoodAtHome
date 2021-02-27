import React from "react";
import "../pages/NoMatch.css"
import { Col, Row, Container } from "../components/Grid";

function AccessDenied() 
{
  return (
    <Container>
      <Row>
        <Col size="lg-12">
      <div className="center">

          <br />
          {/* Adding mobile break so it looks nice on phone - Zo */}
          <h3 className="font-color">You have to be logged in,  <br class="mobile-break"/> <br class="mobile-break"/>
          to do that<span> 🙅🏽‍♂️</span></h3>

        <br /> 

        <button type="button" style={{backgroundColor:"#22B24C" , borderRadius:"10px", padding:"5px"}} ><a href="/">Click here to login</a></button>
        
      </div>
        </Col>
      </Row>
    </Container>
  );
}

export default AccessDenied;