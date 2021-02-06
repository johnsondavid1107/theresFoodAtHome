import React from "react";
import Jumbotron from "../components/Jumbotron";
import { Col, Row, Container } from "../components/Grid";


function Search() {


    return (
      <Container fluid>
        <Row>
          <Col size="md-6">
            <Jumbotron>
              <h1>Search</h1>
            </Jumbotron>
          </Col>
        </Row>
      </Container>
    );
  }


export default Search;
