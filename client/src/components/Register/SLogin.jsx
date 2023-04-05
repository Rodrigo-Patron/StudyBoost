import React from "react";
import "./Register.scss";
import { useContext, useRef } from "react";
import { Context } from "../../Context.jsx";
import { useNavigate } from "react-router-dom";
import { Form, FormControl, Button, ListGroup } from "react-bootstrap";

function SLogin() {
  const { setStudent, setStudentToken } = useContext(Context);
  //^ INPUTS
  const passwordInput = useRef();
  const schoolIdInput = useRef();
  //^ NAVIGATE
  const navigate = useNavigate();
  //^ STUDENT LOGIN HANDLER
  const submitHandler = (e) => {
    e.preventDefault();

    const loginData = {
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

    fetch("http://localhost:6500/api/students/login", config)
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
        localStorage.setItem("studentToken", JSON.stringify(result.token));
        localStorage.setItem("student", JSON.stringify(result.student));
        setStudentToken(result.token);
        setStudent(result.student);
        navigate("/appointment");
      })
      .catch((err) => {
        console.log(err, "coming from catch");
      });
  };

  return (
    <div>
      <h5>Already registered? Please Login!</h5>
      <Form onSubmit={submitHandler}>
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
    </div>
  );
}

export default SLogin;
