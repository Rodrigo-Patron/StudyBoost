import "./Home.scss";
import Header from "../Header/Header";
import React from "react";
import { Row, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function Home() {
  return (
    <div className="home">
      <Header />
      <Row className="home-row">
        <div className="background">
          <h1 className="name">Study Boost</h1>

          <Button className="col-xs-6 home-btn" variant="outline-dark">
            <NavLink to="/teachersPage"> Teachers</NavLink>
          </Button>

          <Button className="col-xs-6 home-btn" variant="outline-dark">
            <NavLink to="/studentsPage">Students</NavLink>
          </Button>
        </div>
      </Row>
    </div>
  );
}

export default Home;
