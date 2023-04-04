import "./Home.scss";
import Header from "../Header/Header";
import React from "react";
import { Container, Row, Button, Card, Col, CardGroup } from "react-bootstrap";
import { NavLink } from "react-router-dom";

function Home() {
  return (
    
    <div className="home">
     <Header/>
      <Row className="home-row">
        <div className="background">
          <NavLink to="/teachersPage">
            <Button className="home-btn" variant="outline-dark">
              Teachers
            </Button>
          
          </NavLink>

          <Button className="home-btn" variant="outline-dark">
            Students
          </Button>
        </div>
      </Row>

      <Card>
        <Card.Body>
          <h2>About us</h2>
        </Card.Body>
      </Card>
      <Container>
        <Row className="about">
          <Col sm={6} className="about1">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Voluptatum, eum. Corporis aspernatur laborum qui dignissimos sit,
              vero vitae eos, labore consequatur dolores illum! Perspiciatis,
              deleniti magnam. Nesciunt doloribus ipsa ex! Lorem ipsum dolor sit
              amet consectetur adipisicing elit. Iusto molestiae ex cum, modi
              non quas nobis ab aliquid aperiam, consequatur, laudantium impedit
              sint rem. Obcaecati qui animi eius sunt reprehenderit?
            </p>
          </Col>
          <Col sm={6} className="about2">
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Distinctio sit, quasi fugiat, adipisci veritatis cupiditate iste
              quia officiis itaque corporis, voluptatum ipsa possimus
              exercitationem perferendis error amet omnis impedit esse! Lorem
              ipsum, dolor sit amet consectetur adipisicing elit. Optio repellat
              sapiente eveniet mollitia nulla beatae magni similique dolorem
              earum repudiandae, ullam dolores saepe consectetur dolor! A ipsam
              molestias at provident.
            </p>
          </Col>
        </Row>
      </Container>

      <Card>
        <Card.Body>
          <h2>Our Team</h2>
        </Card.Body>
      </Card>

      <CardGroup>
        <Card>
          <Card.Img variant="top" />
          <Card.Body>
            <Card.Title>Rodrigo</Card.Title>
            <Card.Text>
              <p>Full stack Developer</p>
            </Card.Text>
          </Card.Body>
        </Card>
        <Card>
          <Card.Img variant="top" />
          <Card.Body>
            <Card.Title>Mohammad</Card.Title>
            <Card.Text>
              <p>Full stack Developer</p>
            </Card.Text>
          </Card.Body>
        </Card>
        <Card>
          <Card.Img variant="top" />
          <Card.Body>
            <Card.Title>Agatha</Card.Title>
            <Card.Text>
              <p>Full stack Developer</p>
            </Card.Text>
          </Card.Body>
        </Card>
        <Card>
          <Card.Img variant="top" />
          <Card.Body>
            <Card.Title>David</Card.Title>
            <Card.Text>
              <p>Full stack Developer</p>
            </Card.Text>
          </Card.Body>
        </Card>
      </CardGroup>
   

    </div>
  );
}

export default Home;
