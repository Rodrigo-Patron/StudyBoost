import React from "react";
import "./TeachersPage.scss";
import TRoute from "../Register/TRoute";
import TLogin from "../Register/TLogin";
import { Row, Col, Card, Container, Button } from "react-bootstrap";
import { useContext } from "react";
import { Context } from "../../Context.jsx";
import { useNavigate } from "react-router-dom";

function TeachersPage() {
  const { loginForm } = useContext(Context);
  //^ NAVIGATE
  const navigate = useNavigate();
  return (
    <div className="teachers">
      <Card className="teachers-card">
        <Card.Body className="teachers-title">
          <h2>Teacher</h2>
        </Card.Body>
      </Card>
      <Container className="teacher-page">
        <Row className="teacher-row">
          <Col sm={6} className="forms">
            {/* REGISTER AND LOGIN FORM */}
            {loginForm ? <TLogin /> : <TRoute />}
          </Col>
          {/*COLUMN*/}
          <Col sm={6}></Col>
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
    </div>
  );
}

export default TeachersPage;
