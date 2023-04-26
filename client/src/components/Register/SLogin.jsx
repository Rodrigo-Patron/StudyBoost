import React from "react";
import "./Register.scss";
import "./SweetAlert.scss";
import { useContext, useRef } from "react";
import { Context } from "../../Context.jsx";
import { useNavigate } from "react-router-dom";
import { Form, FormControl, Button, ListGroup } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import Swal from "sweetalert2";

function SLogin() {
  const { setStudent, setStudentToken, setLoginForm } = useContext(Context);
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
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Wrong school Id or Password!",
          });
        } else if (res.status === 500) {
          Swal.fire("Please write your school Id");
        }
        return res.json();
      })
      .then((result) => {
        // console.log(result);
        if (!result.token) {
          return;
        }
        localStorage.setItem("studentToken", JSON.stringify(result.token));
        localStorage.setItem("student", JSON.stringify(result.student));
        setStudentToken(result.token);
        setStudent(result.student);
        navigate("/studentDashboard");
      })
      .catch((err) => {
        // console.log(err, "coming from catch");
      });
  };
  //^ Show register form onclick
  const registerFormHandler = () => {
    setLoginForm(false);
  };

  return (
    <div>
      <h5>
        No account? Please
        <NavLink onClick={registerFormHandler}>Register</NavLink>
      </h5>
      <Form onSubmit={submitHandler}>
        <ListGroup className="input-container">
          <ListGroup.Item variant="success">
            <FormControl
              type="text"
              placeholder="School Id"
              ref={schoolIdInput}
            />
          </ListGroup.Item>
        </ListGroup>
        <ListGroup className="input-container">
          <ListGroup.Item variant="success">
            <FormControl
              type="password"
              placeholder="Password"
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
