import React from "react";
import "./SAppointment.scss";
import SHeader from "../S-Header/SHeader";
import { ListGroup, Button, Form, Modal } from "react-bootstrap";
import { useContext, useEffect, useState } from "react";
import { Context } from "../../Context.jsx";
// import { FaTrashAlt } from "react-icons/fa";

function SAppointment() {
  const { studentToken, appointment, setAppointment, student } =
    useContext(Context);
  const [show, setShow] = useState(false);
  const [counter, setCounter] = useState(0);

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
  }, [counter]);

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
        // everytime an appointment its deleted the counter changes
        setCounter(counter + 1);
        setAppointment(result);
      })
      .catch((error) => console.log(error));

    setShow(false);
  }

  // modal - popup
  const handleClose = () => setShow(false);

  return (
    <div>
      <SHeader />
      <div className="appointments">
        <h2>Your booked appointments:</h2>

        <ListGroup>
          <ListGroup.Item>
            {appointment &&
              Array.from(appointment).map((appointment) => (
                <Form key={appointment._id}>
                  <p>
                    <span>Date: </span>
                    <span className="task-input">
                      {new Date(appointment.date).toLocaleDateString("de-DE")}
                    </span>
                  </p>
                  <p>
                    <span>Time: </span>
                    <span className="task-input">{appointment.time}</span>{" "}
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
                      <Button variant="secondary" onClick={handleClose}>
                        Close
                      </Button>
                      <Button
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
      </div>
    </div>
  );
}

export default SAppointment;
