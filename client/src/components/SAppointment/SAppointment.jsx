import React from "react";
import "./SAppointment.scss";
import SHeader from "../S-Header/SHeader";
import { ListGroup, Button } from "react-bootstrap";
import { useContext, useEffect } from "react";
import { Context } from "../../Context.jsx";

function SAppointment() {
  const { studentToken, appointment, setAppointment, student } =
    useContext(Context);

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

  return (
    <div>
      <SHeader />
      <div className="appointments">
        <h2>Your booked appointments</h2>

        <ListGroup>
          <ListGroup.Item>
            {appointment &&
              appointment.map((appointment) => (
                <div key={appointment._id}>
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
                  </p>
                  <Button>Cancel</Button>
                  <hr />
                </div>
              ))}
          </ListGroup.Item>
        </ListGroup>
      </div>
    </div>
  );
}

export default SAppointment;
