import React from "react";
import "./SDashboard.scss";
import { useContext, useRef, useEffect } from "react";
import { Context } from "../../Context.jsx";
import { Row, Col, Button, ListGroup } from "react-bootstrap";

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
        <Col sm={4} className="student-dashboard">
          <p>
            Logged in as <span>{student.name}</span>
          </p>
          <p>My appointments</p>
          <Button variant="outline-danger">Logout</Button>
        </Col>

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

                    <Button variant="outline-dark">Book</Button>
                    <Button variant="outline-dark">Cancel</Button>

                    <hr />
                  </div>
                ))}
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
      <hr />
      <Row className="task-list"></Row>
    </div>
  );
}

export default SDashboard;
