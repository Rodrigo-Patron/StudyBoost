import "./Home.scss";
import Header from "../Header/Header";
import Navbar from "../Navbar/Navbar";
import React from "react";
import { useContext } from "react";
import { Context } from "../../Context.jsx";
import { Button, Row, Container, Col } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from './Logo1.png';

function Home() {
  const { isCollapsed } = useContext(Context);

  const headerWidth = isCollapsed ? 2 : 1;
  const remainingWidth = 12 - headerWidth;

  return (
    <Container fluid={true} className="home">
      <Row className="home-row">
         <Col className="navbarCol">
        <Navbar />
        </Col>
        <Col className="headerCol" xs="12" md={headerWidth}>
          <Header />
        </Col>
        <Col  xs="12" md={remainingWidth}>
          <div className="background">
          <div className="logoText">
              {/* small and big change using menuCollapse state */}
              <p>
               <img src={logo}  className= "logo"  width = "250" height = "200" alt="logo" /></p>
            </div>
          <h1 className="name">Study Boost</h1>
          <NavLink to="/teachersPage">
            <Button className="col-xs-6 home-btn" variant="outline-dark">
              Teachers
            </Button>
          </NavLink>
          <NavLink to="/studentsPage">
            <Button className="col-xs-6 home-btn" variant="outline-dark">
              Students
            </Button>
          </NavLink>
          </div>
        </Col>
        
      </Row>
    </Container>
  );
}

export default Home;
