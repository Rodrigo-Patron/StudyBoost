import React from "react";
import "./SAppointment.scss";
import SHeader from "../S-Header/SHeader";
import { ListGroup, Button, Form } from "react-bootstrap";
import { useContext, useEffect } from "react";
import { Context } from "../../Context.jsx";
import { FaTrashAlt } from "react-icons/fa";
import { useState } from "react";

function SAppointment() {
  const { studentToken, appointment, setAppointment, student } =
    useContext(Context);

  const [appointmentId, setAppointmentId] = useState({
    id: "",
  });

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
  }, []);

  //delete appointment

  function deleteHandler(appointment) {
    const config = {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${studentToken}`,
      },
    };
    console.log("id", appointment._id);
    fetch(`http://localhost:6500/api/appointments/${appointment._id}`, config)
      .then((res) => {
        if (!res.ok) {
          res.json().then((err) => console.log(err));
          return;
        }
        return res.json();
      })
      .then((result) => {
        console.log("result", result);
      });
  }

  return (
    <div>
      <SHeader />
      <div className="appointments">
        <h2>Your booked appointments</h2>

        <ListGroup>
          <ListGroup.Item>
            {appointment &&
              appointment.map((appointment) => (
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
                    onClick={() => deleteHandler(appointment)}
                    type="submit"
                    variant="danger"
                    size="sm"
                  >
                    <FaTrashAlt />
                  </Button>
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
