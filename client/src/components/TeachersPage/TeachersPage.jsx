import React from "react";
import "./TeachersPage.scss";
import TRoute from "../Register/TRoute";
import TLogin from "../Register/TLogin";
import { Row, Col, Card, Container } from "react-bootstrap";
import { useContext } from "react";
import { Context } from "../../Context.jsx";

function TeachersPage() {
  const { loginForm } = useContext(Context);
  return (
    <div className="teachers">
      <Card className="teachers-card">
        <Card.Body className="teachers-title">
          <h2>Teachers page</h2>
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
      </Container>
    </div>
  );
}

export default TeachersPage;
