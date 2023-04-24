import React from "react";
import "./Register.scss";
import { useContext, useRef } from "react";
import { Context } from "../../Context.jsx";
import { useNavigate } from "react-router-dom";
import { Form, FormControl, Button, ListGroup } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import Swal from "sweetalert2";

function TLogin() {
  const { setTeacher, setTeacherToken, setLoginForm } = useContext(Context);
  //^ INPUTS
  const passwordInput = useRef();
  const schoolIdInput = useRef();

  //^ NAVIGATE
  const navigate = useNavigate();
  //^ TEACHER LOGIN HANDLER
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

    fetch("http://localhost:6500/api/teachers/login", config)
      .then((res) => {
        if (res.status === 401) {
          // throw Error("credential failed");
          // alert("Wrong Id or password");
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Wrong school Id or Password!",
          });
        } else if (res.status === 500) {
          // alert("Please write your school Id");
          Swal.fire("Please write your school Id");
        }
        return res.json();
      })
      .then((result) => {
        console.log(result);
        if (!result.token) {
          return;
        }
        localStorage.setItem("teacherToken", JSON.stringify(result.token));
        localStorage.setItem("teacher", JSON.stringify(result.teacher));
        setTeacherToken(result.token);
        setTeacher(result.teacher);
        navigate("/availability");
      })
      .catch((err) => {
        console.log(err, "coming from catch");
      });
  };
  //^ Show register form onclick
  const registerFormHandler = () => {
    setLoginForm(false);
  };

  return (
    <div>
      {/* LOGIN */}
      <h5>
        No account? Please{" "}
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

export default TLogin;
