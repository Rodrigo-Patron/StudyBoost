import React from "react";
import "./StudentsPage.scss";
import SRegister from "../Register/SRegister";
import SLogin from "../Register/SLogin";
import { Row, Col, Card } from "react-bootstrap";

function StudentsPage() {
  return (
    <div className="students">
      <Card>
        <Card.Body>
          <h2>Students page</h2>
        </Card.Body>
      </Card>
      <Row className="student-row">
        <Col sm={6} className="register-form">
          {/* REGISTER */}
          <SRegister />
        </Col>
        {/* LOGIN */}
        <Col sm={6} className="login-form">
          <SLogin />
        </Col>
      </Row>
    </div>
  );
}

export default StudentsPage;
