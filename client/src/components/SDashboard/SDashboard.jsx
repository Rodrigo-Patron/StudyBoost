import React from "react";
import "./SDashboard.scss";
import { useContext, useEffect } from "react";
import { Context } from "../../Context.jsx";
import { Row, Col, Button, ListGroup } from "react-bootstrap";
import SHeader from "../S-Header/SHeader";
import { Outlet } from "react-router-dom";
import { NavLink } from "react-router-dom";

function SDashboard() {
  const { student, teacher, setTeacher, studentToken } = useContext(Context);
  //^ get all teachers
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
          return localStorage.removeItem("student");
        }

        return res.json();
      })
      .then((result) => {
        console.log(result.reverse());
        //^ new teacher show at the top
        setTeacher(result);
      });
  }, []);

  return (
    <div>
      <Row className="appointment-block">
        <SHeader />
        <Col sm={4} className="student-dashboard"></Col>

        <Col sm={8} className="teachers-list">
          <h3>
            Hallo <span>{student.name}</span>, find a teacher and book your
            appointment
          </h3>
          <hr />
          <ListGroup>
            <ListGroup.Item variant="warning">
              {teacher &&
                teacher.map((appointment) => (
                  <div key={appointment._id}>
                    <p>
                      <span>Name </span>:{" "}
                      <span className="task-input">{appointment.name}</span>
                    </p>
                    <p>
                      <span>Role</span>:{" "}
                      <span className="task-input">{appointment.role}</span>{" "}
                    </p>
                    <p>
                      <span>Subjects</span>:{" "}
                      <span className="task-input">{appointment.subjects}</span>{" "}
                    </p>

                    <NavLink to={appointment._id}>
                      <Button variant="outline-dark">Book Appointment</Button>
                    </NavLink>

                    <hr />
                  </div>
                ))}
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
      <hr />
      <Outlet />
    </div>
  );
}

export default SDashboard;
