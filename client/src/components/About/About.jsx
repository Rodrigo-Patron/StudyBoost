import "./About.scss";
import Header from "../Header/Header";
import Navbar from "../Navbar/Navbar";
import React from "react";
import { useContext } from "react";
import { Context } from "../../Context.jsx";
import { Container, Row, Card, Col, CardGroup, Button } from "react-bootstrap";
import pic1 from "../../images/Ag.jpg";
import pic2 from "../../images/Mo.jpg";
import pic3 from "../../images/Ro.jpg";
import pic4 from "../../images/Da.jpg";
import { useNavigate } from "react-router-dom";

function About() {
  //^ NAVIGATE
  const navigate = useNavigate();
  // const { isCollapsed } = useContext(Context);

  // const headerWidth = isCollapsed ? 2 : 1;
  // const remainingWidth = 12 - headerWidth;

  return (
    // <Container fluid={true} className="aboutUs">
    //   <Row className="background">
    //     <Col className="navbarCol">
    //       <Navbar />
    //     </Col>
    //     <Col className="headerCol" md={headerWidth}>
    //       <Header />
    //     </Col>
    //     <Col xs="12" md={remainingWidth}>
    //       <Card>
    //         <Card.Body>
    //           <h2>About us</h2>
    //         </Card.Body>
    //       </Card>
    //       <Container className="about-container">
    //         <Row className="about">
    //           <Col xs={12} md={6} className="about1">
    //             <p>
    //               Lorem ipsum dolor sit amet consectetur adipisicing elit.
    //               Voluptatum, eum. Corporis aspernatur laborum qui dignissimos
    //               sit, vero vitae eos, labore consequatur dolores illum!
    //               Perspiciatis, deleniti magnam. Nesciunt doloribus ipsa ex!
    //               Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto
    //               molestiae ex cum, modi non quas nobis ab aliquid aperiam,
    //               consequatur, laudantium impedit sint rem. Obcaecati qui animi
    //               eius sunt reprehenderit?
    //             </p>
    //           </Col>
    //           <Col xs={12} md={6} className="about2">
    //             <p>
    //               Lorem ipsum dolor sit, amet consectetur adipisicing elit.
    //               Distinctio sit, quasi fugiat, adipisci veritatis cupiditate
    //               iste quia officiis itaque corporis, voluptatum ipsa possimus
    //               exercitationem perferendis error amet omnis impedit esse!
    //               Lorem ipsum, dolor sit amet consectetur adipisicing elit.
    //               Optio repellat sapiente eveniet mollitia nulla beatae magni
    //               similique dolorem earum repudiandae, ullam dolores saepe
    //               consectetur dolor! A ipsam molestias at provident.
    //             </p>
    //           </Col>
    //         </Row>
    //       </Container>

    //       <Card>
    //         <Card.Body>
    //           <h2>Our Team</h2>
    //         </Card.Body>
    //       </Card>

    //       <CardGroup>
    //         <Card>
    //           <Card.Img variant="top" className="RodrigoCard img-fluid" />
    //           <Card.Body>
    //             <Card.Title>Rodrigo</Card.Title>
    //             <Card.Text>
    //               <p>Full stack Developer</p>
    //             </Card.Text>
    //           </Card.Body>
    //         </Card>
    //         <Card>
    //           <Card.Img variant="top" className="MohammadCard img-fluid" />
    //           <Card.Body>
    //             <Card.Title>Mohammad</Card.Title>
    //             <Card.Text>
    //               <p>Full stack Developer</p>
    //             </Card.Text>
    //           </Card.Body>
    //         </Card>
    //         <Card>
    //           <Card.Img variant="top" className="AgathaCard img-fluid" />
    //           <Card.Body>
    //             <Card.Title>Agatha</Card.Title>
    //             <Card.Text>
    //               <p>Full stack Developer</p>
    //             </Card.Text>
    //           </Card.Body>
    //         </Card>
    //         <Card>
    //           <Card.Img variant="top" className="DavidCard img-fluid" />
    //           <Card.Body>
    //             <Card.Title>David</Card.Title>
    //             <Card.Text>
    //               <p>Full stack Developer</p>
    //             </Card.Text>
    //           </Card.Body>
    //         </Card>
    //       </CardGroup>
    //     </Col>
    //   </Row>
    // </Container>

    <Container>
      <Card className="heading">
        <Card.Body>
          <h2>About us</h2>
        </Card.Body>
      </Card>
      <Row>
        <Col sm={6} className="about1">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe
            doloremque beatae, tenetur error labore maxime similique pariatur
            sit reprehenderit quaerat porro. Assumenda quibusdam facere amet.
          </p>
        </Col>
        {/*COLUMN*/}
        <Col sm={6} className="about2">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
            itaque reprehenderit, possimus consequatur rerum animi obcaecati,
            fugit blanditiis consequuntur voluptatum quas exercitationem
            repellat, tempore corporis.
          </p>
        </Col>
      </Row>
      <Card className="heading">
        <Card.Body>
          <h2>Our Team</h2>
        </Card.Body>
      </Card>
      <Row className="pics">
        <CardGroup>
          <Card className="RodrigoCard">
            <Card.Img variant="top" src={pic3} />
            <Card.Body>
              <Card.Title>Rodrigo</Card.Title>
              <Card.Text>
                <p>Full stack Developer</p>
              </Card.Text>
            </Card.Body>
          </Card>
          <Card className="MohammadCard">
            <Card.Img variant="top" src={pic2} />

            <Card.Body>
              <Card.Title>Mohammad</Card.Title>
              <Card.Text>
                <p>Full stack Developer</p>
              </Card.Text>
            </Card.Body>
          </Card>
          <Card className="AgathaCard">
            <Card.Img variant="top" src={pic1} />
            <Card.Body>
              <Card.Title>Agatha</Card.Title>
              <Card.Text>
                <p>Full stack Developer</p>
              </Card.Text>
            </Card.Body>
          </Card>
          <Card className="DavidCard">
            <Card.Img variant="top" src={pic4} />
            <Card.Body>
              <Card.Title>David</Card.Title>
              <Card.Text>
                <p>Full stack Developer</p>
              </Card.Text>
            </Card.Body>
          </Card>
        </CardGroup>
      </Row>
      <Button
        className="back-btn"
        onClick={(e) => {
          navigate("/home");
        }}
      >
        Back to homepage
      </Button>
    </Container>
  );
}

export default About;