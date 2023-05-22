import React from "react";
import "./StudentsPage.scss";
import SRoute from "../Register/SRoute";
import SLogin from "../Register/SLogin";
import { Row, Col, Card, Container, Button } from "react-bootstrap";
import { useContext } from "react";
import { Context } from "../../Context.jsx";
import { useNavigate } from "react-router-dom";

function StudentsPage() {
  const { loginForm } = useContext(Context);
  //^ NAVIGATE
  const navigate = useNavigate();
  return (
    <div className="students">
      <Card className="students-card">
        <Card.Body className="students-title">
          <h2>Student</h2>
        </Card.Body>
      </Card>
      <Container className="student-page">
        <Row className="student-row">
          <Col sm={6} className="forms">
            {/* REGISTER AND LOGIN FORM */}
            {loginForm ? <SLogin /> : <SRoute />}
          </Col>
          {/* COLUMN */}
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

export default StudentsPage;
