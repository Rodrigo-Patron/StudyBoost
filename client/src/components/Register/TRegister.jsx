import React from "react";
import "./Register.scss";
import "./SweetAlert.scss";
import { useContext, useRef } from "react";
import { Context } from "../../Context.jsx";
import { NavLink } from "react-router-dom";
import {
  Form,
  FormControl,
  Button,
  ListGroup,
  FormSelect,
} from "react-bootstrap";
import Swal from "sweetalert2";

function TRegister() {
  const { setErrors, setLoginForm } = useContext(Context);
  //^ INPUTS
  const nameInput = useRef();
  const emailInput = useRef();
  const passwordInput = useRef();
  const schoolIdInput = useRef();
  const subjectsInput = useRef();

  //^ TEACHER REGISTER HANDLER
  const submitHandler = (e) => {
    e.preventDefault();
    const formData = {
      email: emailInput.current.value,
      name: nameInput.current.value,
      password: passwordInput.current.value,
      schoolId: schoolIdInput.current.value,
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
            const alertText = err.message.map((error) => {
              if (error.param === "name") {
                return Swal.fire({
                  icon: "error",
                  title: "Registration failed",
                  text: "Please write your full names",
                });
              } else if (error.param === "email") {
                return Swal.fire({
                  icon: "error",
                  title: "Registration failed",
                  text: "Please write a correct email address",
                });
              } else if (error.param === "password") {
                return Swal.fire({
                  icon: "error",
                  title: "Registration failed",
                  text: "Password must contain capital letter, small letter, number and not less than 8 char",
                });
              }
            });
            return;
          });
        }

        Swal.fire({
          icon: "success",
          title: "You are registered",
          text: "Please log in!",
        });
        emailInput.current.value = "";
        nameInput.current.value = "";
        passwordInput.current.value = "";
        schoolIdInput.current.value = "";
        subjectsInput.current.value = "Subjects";
        setLoginForm(true);
      })
      .then((result) => {})
      .catch((err) => {});
  };
  return (
    <div>
      {/* REGISTER */}
      <h5>
        New here? Please Register! /
        <NavLink onClick={() => setLoginForm(true)}>Login</NavLink>
      </h5>
      <Form onSubmit={submitHandler} className="the-form">
        <ListGroup className="input-container">
          <ListGroup.Item variant="dark">
            <FormControl type="text" ref={nameInput} placeholder="Fullname" />
          </ListGroup.Item>
        </ListGroup>
        <ListGroup className="input-container">
          <ListGroup.Item variant="dark">
            <FormControl type="text" ref={emailInput} placeholder="Email" />
          </ListGroup.Item>
        </ListGroup>
        <ListGroup className="input-container">
          <ListGroup.Item variant="dark">
            <FormControl
              type="password"
              ref={passwordInput}
              placeholder="Password"
            />
          </ListGroup.Item>
        </ListGroup>
        <ListGroup className="input-container">
          <ListGroup.Item variant="dark">
            <FormControl
              type="text"
              ref={schoolIdInput}
              placeholder="School Id"
            />
          </ListGroup.Item>
        </ListGroup>
        <ListGroup className="input-container">
          <ListGroup.Item variant="dark">
            <FormSelect type="text" ref={subjectsInput} placeholder="Subjects">
              <option>Subjects</option>
              <option value="Maths">Maths</option>
              <option value="Physics">Physics</option>
              <option value="Business">Business</option>
            </FormSelect>
          </ListGroup.Item>
        </ListGroup>
        <br />
        <Button variant="outline-dark" type="submit">
          Register
        </Button>
      </Form>
    </div>
  );
}

export default TRegister;
