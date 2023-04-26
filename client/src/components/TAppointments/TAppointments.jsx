import React from "react";
import "./TAppointments.scss";
import THeader from "../T-Header/THeader";
import {
  ListGroup,
  Button,
  Form,
  Modal,
  Row,
  Container,
} from "react-bootstrap";
import { useContext, useEffect, useState } from "react";
import { Context } from "../../Context.jsx";

// import { FaTrashAlt } from "react-icons/fa";

function TAppointments() {
  const { teacherToken, appointment, setAppointment, teacher } =
    useContext(Context);
  const [show, setShow] = useState(false);
  const [counter, setCounter] = useState(0);
  const [query, setQuery] = useState(null);

  // get all appointments
  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${teacherToken}`,
      },
    };

    fetch(`http://localhost:6500/api/appointments/teacher/${teacher._id}`, config)
      .then((res) => {
        if (!res.ok) {
          res.json().then((err) => console.log(err));
          return;
        }
        return res.json();
      })
      .then((result) => {
        console.log("result", result);
        setAppointment(result);
      });
  }, [counter, query, setAppointment, teacher._id, teacherToken]);

  //delete appointment
  function deleteHandler(appointment) {
    const config = {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${teacherToken}`,
      },
    };

    fetch(`http://localhost:6500/api/appointments/${appointment._id}`, config)
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

        console.log("RESULT:", result);
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
      return false
    });
    if (filteredAppointment.length === 0) {
      setQuery("Appointment not found");
    } else {
      setQuery(filteredAppointment);
    }
  };

  return (
    <div>
      <THeader />
      <Container className="appointments">
        <Row className="appointment-row">
          <div className="top-header">
            <h2>Your booked appointments:</h2>
            <div className="search-bar">
              <input placeholder="Search..." onChange={filterHandler} />
            </div>
          </div>
          <ListGroup>
            <ListGroup.Item>
              {query === "Appointment not found"
                ? "Appointment not found"
                : query
                ? query.map((appointment) => (
                    <Form key={appointment._id}>
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
                      <Button
                        onClick={() => setShow(true)}
                        variant="danger"
                        size="sm"
                      >
                        Cancel
                        {/* <FaTrashAlt /> */}
                      </Button>
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
                      <hr />
                    </Form>
                  ))
                : appointment.length === 0
                ? "You have no appointments"
                : appointment.map((appointment) => (
                    <Form key={appointment._id}>
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
                      <Button
                        onClick={() => setShow(true)}
                        variant="danger"
                        size="sm"
                      >
                        Cancel
                        {/* <FaTrashAlt /> */}
                      </Button>
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
                      <hr />
                    </Form>
                  ))}
            </ListGroup.Item>
          </ListGroup>
        </Row>
      </Container>
    </div>
  );
}

export default TAppointments;
