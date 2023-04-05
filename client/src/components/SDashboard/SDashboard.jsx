import React from "react";
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
    fetch("http://localhost:6500/api/teachers/allTeachers", config)
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
      <h2>here we have student's dashboard and the list of teachers</h2>
      <div>
        <Row className="tasks">
          <Col sm={4} className="dashboard">
            <p>
              Logged in as <span>{student.name}</span>
            </p>
            <Button variant="outline-danger">Logout</Button>
          </Col>

          <Col sm={8} className="teachers-list">
            <h3>
              Hallo <span>{student.name}</span>, find a teacher and book your
              appointment
            </h3>
            <hr />
          </Col>
        </Row>
        <hr />
        <Row className="task-list">
          <ListGroup>
            <ListGroup.Item variant="secondary">
              {teacher &&
                teacher.map((appointment) => (
                  <div key={appointment._id}>
                    <p>
                      <span>Name </span>:{" "}
                      <span className="task-input">{teacher.name}</span>
                    </p>
                    <p>
                      <span>Description</span>:{" "}
                      <span className="task-input">{teacher.subjects}</span>{" "}
                    </p>

                    <Button variant="outline-dark">Cancel</Button>

                    <hr />
                  </div>
                ))}
            </ListGroup.Item>
          </ListGroup>
        </Row>
      </div>
    </div>
  );
}

export default SDashboard;
