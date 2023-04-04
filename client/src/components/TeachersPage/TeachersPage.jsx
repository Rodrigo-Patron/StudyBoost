import React from "react";
import "./TeachersPage.scss";
import { useContext, useRef } from "react";
import { Context } from "../../Context.jsx";
import { useNavigate } from "react-router-dom";
import {
  Form,
  FormControl,
  Button,
  ListGroup,
  Col,
  Row,
  Container,
} from "react-bootstrap";

function TeachersPage() {
  const { setErrors } = useContext(Context);
  const { setTeacher, setTeacherToken } = useContext(Context);
  //^ INPUTS
  const nameInput = useRef();
  const emailInput = useRef();
  const passwordInput = useRef();
  const schoolIdInput = useRef();
  const roleInput = useRef();
  const subjectsInput = useRef();
  //^ NAVIGATE
  const navigate = useNavigate();
  //^ TEACHER REGISTER HANDLER
  const submitHandler1 = (e) => {
    e.preventDefault();
    const formData = {
      email: emailInput.current.value,
      name: nameInput.current.value,
      password: passwordInput.current.value,
      schoolId: schoolIdInput.current.value,
      role: roleInput.current.value,
      subjects: subjectsInput.current.value,
    };
    const config = {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    };

    fetch("http://localhost:6500/api/teachers/register", config)
      .then((res) => {
        if (!res.ok) {
          return res.json().then((err) => {
            console.log(err);
            setErrors(err);
          });
        }
        return res.json();
      })
      .then((result) => {
        console.log("where are you:", result);
      })
      .catch((err) => {
        setErrors(err);
        console.log(err);
      });
    emailInput.current.value = "";
    nameInput.current.value = "";
    passwordInput.current.value = "";
    alert("You are registered, Please login");
  };

  //^ TEACHER LOGIN HANDLER
  const submitHandler2 = (e) => {
    e.preventDefault();

    const loginData = {
      email: emailInput.current.value,
      schoolId: schoolIdInput.current.value,
      password: passwordInput.current.value,
    };
    const config = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
    };

    fetch("http://localhost:6500/api/teachers/login", config)
      .then((res) => {
        if (res.status === 401) {
          throw Error("credential failed");
        }

        return res.json();
      })
      .then((result) => {
        console.log(result);
        if (!result.token) {
          return;
        }
        localStorage.setItem(
          "teacherToken",
          JSON.stringify(result.teacherToken)
        );
        localStorage.setItem("teacher", JSON.stringify(result.teacher));
        setTeacherToken(result.teacherToken);
        setTeacher(result.teacher);
      })
      .catch((err) => {
        console.log(err, "coming from catch");
      });
    navigate("/availability");
  };

  return (
    <div className="teachers">
      <Container>
        {/* REGISTER */}
        <Row className="teacher-register">
          <Col sm={6} className="register-form">
            <Form onSubmit={submitHandler1} className="the-form">
              <h5>Register yourself here</h5>
              <ListGroup className="input-container">
                <ListGroup.Item variant="dark">
                  <FormControl
                    type="text"
                    ref={nameInput}
                    placeholder="your name"
                  />
                </ListGroup.Item>
              </ListGroup>
              <ListGroup className="input-container">
                <ListGroup.Item variant="dark">
                  <FormControl
                    type="email"
                    ref={emailInput}
                    placeholder="your email"
                  />
                </ListGroup.Item>
              </ListGroup>
              <ListGroup className="input-container">
                <ListGroup.Item variant="dark">
                  <FormControl
                    type="password"
                    ref={passwordInput}
                    placeholder="password"
                  />
                </ListGroup.Item>
              </ListGroup>
              <ListGroup className="input-container">
                <ListGroup.Item variant="dark">
                  <FormControl
                    type="number"
                    ref={schoolIdInput}
                    placeholder="School Id"
                  />
                </ListGroup.Item>
              </ListGroup>
              <ListGroup className="input-container">
                <ListGroup.Item variant="dark">
                  <FormControl type="text" ref={roleInput} placeholder="role" />
                </ListGroup.Item>
              </ListGroup>
              <ListGroup className="input-container">
                <ListGroup.Item variant="dark">
                  <FormControl
                    type="text"
                    ref={subjectsInput}
                    placeholder="subjects"
                  />
                </ListGroup.Item>
              </ListGroup>
              <br />
              <Button variant="outline-dark" type="submit">
                Register
              </Button>
            </Form>
          </Col>

          {/* LOGIN */}
          <Col sm={6} className="login-form">
            <h5>Already registered? Please Login!</h5>
            <Form onSubmit={submitHandler2}>
              <ListGroup className="input-container">
                <ListGroup.Item variant="success">
                  <FormControl
                    type="number"
                    placeholder="Your school Id..."
                    ref={schoolIdInput}
                  />
                </ListGroup.Item>
              </ListGroup>
              <ListGroup className="input-container">
                <ListGroup.Item variant="success">
                  <FormControl
                    type="password"
                    placeholder="password"
                    ref={passwordInput}
                  />
                </ListGroup.Item>
              </ListGroup>
              <br />
              <Button variant="outline-dark" type="submit">
                Login
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default TeachersPage;
