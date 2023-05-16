import "./About.scss";
import Header from "../Header/Header";
import Navbar from "../Navbar/Navbar";
import React from "react";
import { useContext } from "react";
import { Context } from "../../Context.jsx";
import { Container, Row, Card, Col, CardGroup } from "react-bootstrap";

function About() {
  const { isCollapsed } = useContext(Context);

  const headerWidth = isCollapsed ? 2 : 1;
  const remainingWidth = 12 - headerWidth;

  return (
    <Container fluid={true} className="aboutUs">
      <Row className="background">
        <Col className="navbarCol">
          <Navbar />
        </Col>
        <Col className="headerCol" md={headerWidth}>
          <Header />
        </Col>
        <Col xs="12" md={remainingWidth}>
          <Card>
            <Card.Body>
              <h2>About us</h2>
            </Card.Body>
          </Card>
          <Container className="about-container">
            <Row className="about">
              <Col xs={12} md={6} className="about1">
                <p>
                  <strong>"Our Story:</strong> As students ourselves, we
                  understand the struggle of balancing academic and personal
                  responsibilities. That's why we came together to create Study
                  Boost, to simplifies the study process and helps students and
                  teachers make the most of their time. <br />
                  <strong>Our Mission:</strong> Our mission is to empower
                  students and teachers to achieve their academic goals through
                  effective organization and collaboration. We believe that
                  everyone deserves the opportunity to succeed, and that Study
                  Boost can help make that a reality.
                </p>
              </Col>
              <Col xs={12} md={6} className="about2">
                <p>
                  <strong>Our Values:</strong>We value
                  simplicity and accessibility.We
                  constantly explore new ideas and to enhance
                  user experience and make learning more
                  interactive. We believe that studying should be
                  stress-free, and everyone should have the opportunity to
                  learn and grow. <br />
                  <strong>Our Future:</strong> We are committed to continuously
                  improving and expanding Study Boost to meet the needs of
                  students and teachers everywhere. We have exciting plans for
                  future features and updates, and we can't wait to share them
                  with you."
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
              <Card.Img variant="top" className="RodrigoCard img-fluid" />
              <Card.Body>
                <Card.Title>Rodrigo</Card.Title>
                <Card.Text>
                  <p>Full stack Developer</p>
                </Card.Text>
              </Card.Body>
            </Card>
            <Card>
              <Card.Img variant="top" className="MohammadCard img-fluid" />
              <Card.Body>
                <Card.Title>Mohammad</Card.Title>
                <Card.Text>
                  <p>Full stack Developer</p>
                </Card.Text>
              </Card.Body>
            </Card>
            <Card>
              <Card.Img variant="top" className="AgathaCard img-fluid" />
              <Card.Body>
                <Card.Title>Agatha</Card.Title>
                <Card.Text>
                  <p>Full stack Developer</p>
                </Card.Text>
              </Card.Body>
            </Card>
            <Card>
              <Card.Img variant="top" className="DavidCard img-fluid" />
              <Card.Body>
                <Card.Title>David</Card.Title>
                <Card.Text>
                  <p>Full stack Developer</p>
                </Card.Text>
              </Card.Body>
            </Card>
          </CardGroup>
        </Col>
      </Row>
    </Container>
  );
}

export default About;
