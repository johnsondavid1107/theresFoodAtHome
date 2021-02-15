import React from "react";
import "../pages/NoMatch.css"
import { Col, Row, Container } from "../components/Grid";


function NoMatch() 
{
  return (
    <Container fluid>
      <Row>
        <Col size="md-12">
            
            
            <h3>404 Page Not Found <span role="img" aria-label="wandering-eyes">🙄</span></h3>
           
             {/* Team Footer - Zo on each for now */}
             
        </Col>
      </Row>
    </Container>
  );
}

export default NoMatch;
