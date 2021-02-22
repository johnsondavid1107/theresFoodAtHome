import React, { useEffect } from "react";
import { Col, Row, Container } from "../components/Grid";
import { signOut } from "../utils/firebase"


function Logout() {


  useEffect(signOut(), [])


  return (
    <Container fluid>
      <Row>
        <Col size="lg-12">

          <div>



          </div>
        </Col>
      </Row>
    </Container>
  );
}


export default Logout;