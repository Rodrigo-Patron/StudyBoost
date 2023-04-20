import React from "react";
import "./StudentsPage.scss";
import SRoute from "../Register/SRoute";
import SLogin from "../Register/SLogin";
import { Row, Col, Card, Container } from "react-bootstrap";
import { useContext } from "react";
import { Context } from "../../Context.jsx";

function StudentsPage() {
  const { loginForm } = useContext(Context);
  return (
    <div className="students">
      <Card className="students-card">
        <Card.Body className="students-title">
          <h2>Students page</h2>
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
      </Container>
    </div>
  );
}

export default StudentsPage;
