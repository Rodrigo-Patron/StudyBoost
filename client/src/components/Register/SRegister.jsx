import React from "react";
import "./Register.scss";
import { useContext, useRef } from "react";
import { Context } from "../../Context.jsx";
import { Form, FormControl, Button, ListGroup } from "react-bootstrap";

function SRegister() {
  const { setErrors } = useContext(Context);
  //^ INPUTS
  const nameInput = useRef();
  const emailInput = useRef();
  const passwordInput = useRef();
  const schoolIdInput = useRef();
  //^ STUDENT REGISTER HANDLER
  const submitHandler = (e) => {
    e.preventDefault();
    const formData = {
      email: emailInput.current.value,
      name: nameInput.current.value,
      password: passwordInput.current.value,
      schoolId: schoolIdInput.current.value,
    };
    const config = {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    };

    fetch("http://localhost:6500/api/students/register", config)
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
        // console.log("where are you:", result);
      })
      .catch((err) => {
        setErrors(err);
        // console.log(err);
      });
    emailInput.current.value = "";
    nameInput.current.value = "";
    passwordInput.current.value = "";
    schoolIdInput.current.value = "";

    alert("You are registered, please login");
  };
  return (
    <div>
      <Form onSubmit={submitHandler} className="the-form">
        <h5>New here? Please Register!</h5>
        <ListGroup className="input-container">
          <ListGroup.Item variant="dark">
            <FormControl type="text" ref={nameInput} placeholder="Fullname" />
          </ListGroup.Item>
        </ListGroup>
        <ListGroup className="input-container">
          <ListGroup.Item variant="dark">
            <FormControl type="email" ref={emailInput} placeholder="Email" />
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
        <br />
        <Button variant="outline-dark" type="submit">
          Register
        </Button>
      </Form>
    </div>
  );
}

export default SRegister;
