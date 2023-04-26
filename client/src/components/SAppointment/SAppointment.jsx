import React from "react";
import "./SAppointment.scss";
import SHeader from "../S-Header/SHeader";
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

function SAppointment() {
  const { studentToken, appointment, setAppointment, student } =
    useContext(Context);
  const [show, setShow] = useState(false);
  const [counter, setCounter] = useState(0);
  const [query, setQuery] = useState(null);

  // get all appointments
  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${studentToken}`,
      },
    };

    fetch(`http://localhost:6500/api/appointments/${student._id}`, config)
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
  }, [counter, query]);

  //delete appointment
  function deleteHandler(appointment) {
    const config = {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${studentToken}`,
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
        //everytime an appointment its deleted the counter changes
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
        appointment.teacher.name
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

  return (
    <div>
      <SHeader />
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
                        <span>Teacher: </span>
                        <span className="task-input">
                          {appointment.teacher.name}
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
                : appointment &&
                  appointment.map((appointment) => (
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
                        <span>Teacher: </span>
                        <span className="task-input">
                          {appointment.teacher.name}
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

export default SAppointment;
