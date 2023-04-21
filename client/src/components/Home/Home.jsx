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

 

          <h1 className="name">Study Boost App</h1>
          <NavLink to="/teachersPage">
            <Button className="col-xs-6 home-btn" variant="outline-dark">
              Teachers
            </Button>
          </NavLink>
          <NavLink to="/studentsPage">
            <Button
                          className="col-xs-6 home-btn"
              variant="outline-dark"
            >
              Students
            </Button>
          </NavLink>

        </div>
      </Row>
    </div>
  );
}

export default Home;
