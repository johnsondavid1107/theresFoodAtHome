import React from "react";
import { Col, Row, Container } from "../components/Grid";
import Jumbotron from "../components/Jumbotron";

function NoMatch() {
  return (
    <Container fluid>
      <Row>
        <Col size="lg-12">
          <Jumbotron>
          <img src="https://64.media.tumblr.com/9349974fb9a13871013fa9b9937e78dd/tumblr_odbp5zQl6I1umqln3o1_400.gifv"/>
            <br/>
            
            <h1>404 Page Not Found 🙄</h1>
           
             {/* Team Footer - Zo on each for now */}
    <footer className="footer">
                <div className="content has-text-centered">
                    <p>
                        <strong>© 2021 <span>Wait! </span>There's Food</strong> by 
                        <a href="https://github.com/johnsondavid1107/theresFoodAtHome"> Team 4 😎</a>
                      
    </p>
                </div>
            </footer>

          </Jumbotron>
        </Col>
      </Row>
    </Container>
  );
}

export default NoMatch;
