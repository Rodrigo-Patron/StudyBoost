import React from "react";
import "./TeachersPage.scss";
import TRegister from "../Register/TRegister";
import TLogin from "../Register/TLogin";
import { Row, Col, Card } from "react-bootstrap";

function TeachersPage() {
  return (
    <div className="teachers">
      <Card>
        <Card.Body>
          <h2>Teachers page</h2>
        </Card.Body>
      </Card>
      <Row className="teacher-row">
        <Col sm={12} md={6} className="register-form">
          {/* REGISTER */}
          <TRegister />
        </Col>
        {/* LOGIN */}
        <Col sm={12} md={6} className="login-form">
          <TLogin />
        </Col>
      </Row>
    </div>
  );
}

export default TeachersPage;
