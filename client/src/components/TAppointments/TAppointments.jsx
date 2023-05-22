import React from "react";
import "./TAppointments.scss";
import THeader from "../T-Header/THeader";
import TNavbar from "../TNavbar/TNavbar";

import {
  ListGroup,
  Button,
  Form,
  Modal,
  Row,
  Container,
  Col,
} from "react-bootstrap";
import { useContext, useEffect, useState, useRef } from "react";
import { Context } from "../../Context.jsx";

function TAppointments() {
  const { teacherToken, appointment, setAppointment, teacher, isCollapsed } =
    useContext(Context);
  const [show, setShow] = useState(false);
  const [counter, setCounter] = useState(0);
  const [query, setQuery] = useState(null);
  const [id, setId] = useState();

  const inputValue = useRef();

  // get all appointments
  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${teacherToken}`,
      },
    };

    fetch(
      `http://localhost:6500/api/appointments/teacher/${teacher._id}`,
      config
    )
      .then((res) => {
        if (!res.ok) {
          res.json().then((err) => console.log(err));
          return;
        }
        return res.json();
      })
      .then((result) => {
        setAppointment(result);
      });
  }, [counter, query]);

  //this helps us to grab the id of the appointment
  const cancelHandler = (appointment) => {
    setShow(true);
    setId(appointment._id);
  };

  //delete appointment
  function deleteHandler() {
    const config = {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${teacherToken}`,
      },
    };

    fetch(`http://localhost:6500/api/appointments/${id}`, config)
      .then((res) => {
        if (!res.ok) {
          res.json().then((err) => console.log(err));
          return;
        }
        return res.json();
      })
      .then((result) => {
        //every time an appointment its deleted the counter changes
        setCounter(counter + 1);
        setQuery(null);
        inputValue.current.value = "";

        // console.log("RESULT:", result);
      })
      .catch((error) => console.log(error));

    setShow(false);
  }

  // modal - popup
  const handleClose = () => setShow(false);

  const filterHandler = (e) => {
    const filteredAppointment = appointment.filter((appointment) => {
      if (
        new Date(appointment.date)
          .toLocaleDateString(navigator.language)
          .includes(e.target.value) ||
        appointment.student.name
          .toLowerCase()
          .includes(e.target.value.toLowerCase())
      ) {
        return appointment;
      }
    });
    if (filteredAppointment.length === 0) {
      setQuery("Appointment not found");
    } else {
      setQuery(filteredAppointment);
    }
  };

  const headerWidth = isCollapsed ? 2 : 1;
  const remainingWidth = 12 - headerWidth;

  return (
    <Container fluid={true} className="dashboard-container">
      <Row className="dashboard-row">
        <Col className="navbarCol">
          <TNavbar />
        </Col>
        <Col className="headerCol" xs="12" md={headerWidth}>
          <THeader />
        </Col>
        <Col className="appointments" xs="12" md={remainingWidth}>
          <div className="top-header">
            <h3>Your booked appointments:</h3>
            <div className="search-bar">
              <input
                placeholder="Search..."
                onChange={filterHandler}
                ref={inputValue}
              />
            </div>
          </div>
          <ListGroup>
            <ListGroup.Item>
              {query === "Appointment not found"
                ? "Appointment not found"
                : query
                ? query.map((appointment) => (
                    <Form key={appointment._id}>
                      <div className="ap-info">
                        <p>
                          <span>Date: </span>
                          <span className="task-input">
                            {new Date(appointment.date).toLocaleDateString(
                              navigator.language
                            )}
                          </span>
                        </p>
                        <p>
                          <span>Time: </span>
                          <span className="task-input">
                            {appointment.time}
                          </span>{" "}
                        </p>
                        <p>
                          <span>Student: </span>
                          <span className="task-input">
                            {appointment.student.name}
                          </span>
                        </p>{" "}
                      </div>
                      <div className="cancel-btn">
                        <Button
                          onClick={() => cancelHandler(appointment)}
                          variant="danger"
                          size="sm"
                        >
                          Cancel
                        </Button>
                      </div>
                      <Modal
                        show={show}
                        backdrop="static"
                        keyboard={false}
                        centered
                      >
                        <Modal.Body>
                          Are you sure to delete this appointment?{" "}
                        </Modal.Body>
                        <Modal.Footer>
                          <Button
                            size="sm"
                            variant="secondary"
                            onClick={handleClose}
                          >
                            Close
                          </Button>
                          <Button
                            size="sm"
                            className="btn-confirm"
                            variant="primary"
                            onClick={() => deleteHandler(appointment)}
                          >
                            Confirm
                          </Button>
                        </Modal.Footer>
                      </Modal>
                    </Form>
                  ))
                : appointment.length === 0
                ? "You have no appointments"
                : appointment.map((appointment) => (
                    <Form key={appointment._id}>
                      <div className="ap-info">
                        <p>
                          <span>Date: </span>
                          <span className="task-input">
                            {new Date(appointment.date).toLocaleDateString(
                              navigator.language
                            )}
                          </span>
                        </p>
                        <p>
                          <span>Time: </span>
                          <span className="task-input">
                            {appointment.time}
                          </span>{" "}
                        </p>
                        <p>
                          <span>Student: </span>
                          <span className="task-input">
                            {appointment.student.name}
                          </span>
                        </p>{" "}
                      </div>
                      <div className="cancel-btn">
                        <Button
                          onClick={() => cancelHandler(appointment)}
                          variant="danger"
                          size="sm"
                        >
                          Cancel
                        </Button>
                      </div>
                      <Modal
                        show={show}
                        backdrop="static"
                        keyboard={false}
                        centered
                      >
                        <Modal.Body>
                          Are you sure to delete this appointment?{" "}
                        </Modal.Body>
                        <Modal.Footer>
                          <Button
                            size="sm"
                            variant="secondary"
                            onClick={handleClose}
                          >
                            Close
                          </Button>
                          <Button
                            size="sm"
                            className="btn-confirm"
                            variant="primary"
                            onClick={() => deleteHandler(appointment)}
                          >
                            Confirm
                          </Button>
                        </Modal.Footer>
                      </Modal>
                    </Form>
                  ))}
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
}

export default TAppointments;
