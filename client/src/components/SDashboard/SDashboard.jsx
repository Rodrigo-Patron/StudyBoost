import React from "react";
import "./SDashboard.scss";
import { useContext, useEffect, useState } from "react";
import { Context } from "../../Context.jsx";
import { Button, ListGroup } from "react-bootstrap";
import SHeader from "../S-Header/SHeader";
import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function SDashboard() {
  const navigate = useNavigate();
  const { student, teacher, setTeacher, studentToken, isCollapsed } =
    useContext(Context);
  const [query, setQuery] = useState(null);

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
        setTeacher(result);
      });
  }, [query]);

  const filterHandler = (e) => {
    const filteredTeacher = teacher.filter((teacher) => {
      if (
        teacher.name.toLowerCase().includes(e.target.value.toLowerCase()) ||
        teacher.subjects.toLowerCase().includes(e.target.value.toLowerCase())
      ) {
        return teacher;
      }
    });

    if (filteredTeacher.length === 0) {
      setQuery("Teacher not found");
    } else {
      setQuery(filteredTeacher);
    }
  };

  const headerWidth = isCollapsed ? 3 : 1;
  const remainingWidth = 12 - headerWidth;

  return (
    //     <div class="d-flex bd-highlight">
    //   <div class="p-2 w-100 bd-highlight">Flex item</div>
    //   <div class="p-2 flex-shrink-1 bd-highlight">Flex item</div>
    // </div>

    <Container fluid={true} className="dashboard-container">
      <Row className="dashboard-row">
        <Col xs="12" md={headerWidth}>
          {" "}
          <SHeader />
        </Col>
        <Col className="appointment-container" xs="12" md={remainingWidth}>
          <div className="top-header">
            <h4 className="title">
              Hello <span className="student-name">{student.name}</span>, find a
              teacher and book your appointment
            </h4>
            <div className="search-bar">
              <input placeholder="Search..." onChange={filterHandler} />
            </div>
          </div>
          <ListGroup className="teacher-details">
            <ListGroup.Item variant="light">
              {query === "Teacher not found"
                ? "Teacher not found"
                : query
                ? query.map((teacher) => (
                    <div key={teacher._id}>
                      <p>
                        <span>Name: </span>{" "}
                        <span className="teacher-input">{teacher.name}</span>
                      </p>

                      <p>
                        <span>Subject:</span>{" "}
                        <span className="teacher-input">
                          {teacher.subjects}
                        </span>{" "}
                      </p>

                      <Button
                        size="sm"
                        className="appointment-btn"
                        disabled={
                          !teacher.availabilityByTeacher.length ? true : false
                        }
                        onClick={(e) => {
                          navigate(`/studentDashboard/${teacher._id}`);
                        }}
                      >
                        {!teacher.availabilityByTeacher.length
                          ? "No availability"
                          : "Book appointment"}
                      </Button>
                    </div>
                  ))
                : teacher
                ? teacher.length === 0
                  ? "There is no teacher available"
                  : teacher.map((teacher) => (
                      <div key={teacher._id}>
                        <p>
                          <span>Name: </span>{" "}
                          <span className="teacher-input">{teacher.name}</span>
                        </p>

                        <p>
                          <span>Subject:</span>{" "}
                          <span className="teacher-input">
                            {teacher.subjects}
                          </span>{" "}
                        </p>

                        <Button
                          size="sm"
                          className="appointment-btn"
                          disabled={
                            !teacher.availabilityByTeacher.length ? true : false
                          }
                          onClick={(e) => {
                            navigate(`/studentDashboard/${teacher._id}`);
                          }}
                        >
                          {!teacher.availabilityByTeacher.length
                            ? "No availability"
                            : "Book appointment"}
                        </Button>
                      </div>
                    ))
                : null}
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
}

export default SDashboard;
