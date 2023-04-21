import React from "react";
import "./SDashboard.scss";
import { useContext, useEffect } from "react";
import { Context } from "../../Context.jsx";
import { Row, Button, ListGroup, Container } from "react-bootstrap";
import SHeader from "../S-Header/SHeader";
import { NavLink } from "react-router-dom";

function SDashboard() {
  const { student, teacher, setTeacher, studentToken, availability } =
    useContext(Context);
  //  get all teachers
  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${studentToken}`,
      },
    };
    fetch("http://localhost:6500/api/teachers/", config)
      .then((res) => {
        if (!res.ok) {
          res.json().then((err) => console.log(err));
          return;
        }

        return res.json();
      })
      .then((result) => {
        // console.log(result.reverse());
        //^ new teacher show at the top
        setTeacher(result);
      });
  }, []);

  const slotsAvailable = availability && availability.length;

  return (
    <div className="student-dashboard">
      <SHeader />
      <Container className="appointment-container">
        <Row className="appointment-row">
          <p className="title">
            Hello <span className="student-name">{student.name}</span>, find a
            teacher and book your appointment
          </p>
          <hr />
          <ListGroup className="teacher-details">
            <ListGroup.Item variant="light">
              {teacher &&
                teacher.map((appointment) => (
                  <div key={appointment._id}>
                    <p>
                      <span>NAME: </span>{" "}
                      <span className="teacher-input">{appointment.name}</span>
                    </p>
                    <p>
                      <span>ROLE:</span>{" "}
                      <span className="teacher-input">{appointment.role}</span>{" "}
                    </p>
                    <p>
                      <span>SUBJECTS:</span>{" "}
                      <span className="teacher-input">
                        {appointment.subjects}
                      </span>{" "}
                    </p>
                    <NavLink to={appointment._id}>
                      <Button
                        className="appointment-btn"
                        disabled={!slotsAvailable}
                      >
                        {slotsAvailable
                          ? "Book Appointment"
                          : "No availability"}
                      </Button>
                    </NavLink>
                    <hr />
                  </div>
                ))}
            </ListGroup.Item>
          </ListGroup>
        </Row>
      </Container>
    </div>
  );
}

export default SDashboard;
