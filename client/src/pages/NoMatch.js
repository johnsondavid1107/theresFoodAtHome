import React from "react";
import "../pages/NoMatch.css"
import { Col, Row, Container } from "../components/Grid";

function NoMatch() 
{
  return (
    <Container>
      <Row>
        <Col size="lg-12">

          <br />

          <h3>404 Page Not Found <span role="img" aria-label="wandering-eyes">🙄</span></h3>

          {/* Team Footer - Zo on each for now */}

        </Col>
      </Row>
    </Container>
  );
}

export default NoMatch;
