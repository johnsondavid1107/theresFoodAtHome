import React from "react";
// import { Col, Row, Container } from "../components/Grid";
import "./Pantry.css";
import logo from "../../src/images/placeholder-1.jpg";
import logo1 from "../../src/images/placeholder-2.jpg";
import logo2 from "../../src/images/placeholder-3.jpg";

import { Container, Row, Col, Button, Card, Accordion, Image, Form } from "react-bootstrap";

function Recipes() {
  return (
    <div>
      <Container fluid>

      <Accordion className="mt-3" defaultActiveKey="0">
          <Card>
            <Accordion.Toggle as={Card.Header} eventKey="0" className="text-center">
            Ingredients
    </Accordion.Toggle>
            <Accordion.Collapse eventKey="0">
              <Card.Body>
              <Form>
                  <Form>
                    {['checkbox'].map((type) => (
                      <div key={`inline-${type}`} className="mb-3">
                        <Form.Check inline label="Ingredient 1" type={type} id={`inline-${type}-1`} />
                        <Form.Check inline label="Ingredient 2" type={type} id={`inline-${type}-2`} />
                        <Form.Check inline label="Ingredient 3" type={type} id={`inline-${type}-3`} />
                        <Form.Check inline label="Ingredient 4" type={type} id={`inline-${type}-4`} />
                        <Form.Check inline label="Ingredient 5" type={type} id={`inline-${type}-5`} />
                        <Form.Check inline label="Ingredient 6" type={type} id={`inline-${type}-6`} />
                        <Form.Check inline label="Ingredient 7" type={type} id={`inline-${type}-7`} />
                        <Form.Check inline label="Ingredient 8" type={type} id={`inline-${type}-8`} />
                        <Form.Check inline label="Ingredient 9" type={type} id={`inline-${type}-9`} />
                        <Form.Check inline label="Ingredient 10" type={type} id={`inline-${type}-10`} />
                        <Form.Check inline label="Ingredient 11" type={type} id={`inline-${type}-11`} />
                        <Form.Check inline label="Ingredient 12" type={type} id={`inline-${type}-12`} />
                        <Form.Check inline label="Ingredient 13" type={type} id={`inline-${type}-13`} />
                        <Form.Check inline label="Ingredient 14" type={type} id={`inline-${type}-14`} />
                        <Form.Check inline label="Ingredient 15" type={type} id={`inline-${type}-15`} />
                        <Form.Check inline label="Ingredient 16" type={type} id={`inline-${type}-16`} />
                        <Form.Check inline label="Ingredient 17" type={type} id={`inline-${type}-17`} />
                        <Form.Check inline label="Ingredient 18" type={type} id={`inline-${type}-18`} />
                      </div>
                    ))}
                  </Form>
                </Form>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>

        <Container fluid className="mt-3">
          <Row>
            <Col className="col-4" xs={6} md={4}>
              <Card>
                {/* <img className="food-images card-img-top" src={logo2} alt="placeholder2"/> */}
                <Image className="food-images" src={logo2} alt="placeholder2" rounded />
                <Card.Body>
                  <h5>Test</h5>
                </Card.Body>
              </Card>
            </Col>
            <Col className="col-4 text-center btn-group-vertical">
              <Button className="d-grid gap-2 mx-auto">Primary</Button>
              <Button
                variant="btn btn-secondary"
                className="d-grid gap-2 mx-auto"
              >
                Secondary
                  </Button>
              <Button
                variant="btn btn-success"
                className="d-grid gap-2 mx-auto"
              >
                Success
                  </Button>
              <Button
                variant="btn btn-danger"
                className="d-grid gap-2 mx-auto"
              >
                Danger
                  </Button>
              <Button
                variant="btn btn-warning"
                className="d-grid gap-2 mx-auto"
              >
                Warning
                  </Button>
              <Button
                variant="btn btn-info"
                className="d-grid gap-2 mx-auto"
              >
                Info
                  </Button>
              <Button
                variant="btn btn-light"
                className="d-grid gap-2 mx-auto"
              >
                Light
                  </Button>
              <Button
                variant="btn btn-dark"
                className="d-grid gap-2 mx-auto"
              >
                Dark
                  </Button>
            </Col>
            <Col className="col-4" xs={6} md={4}>
              <Card>
                <Image className="food-images" src={logo2} alt="placeholder2" rounded />
                <Card.Body>
                  <h5>Test</h5>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>



      </Container>
    </div>
  );
}

export default Recipes;
