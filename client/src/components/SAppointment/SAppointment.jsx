import React from "react";
import "./SAppointment.scss";
import SHeader from "../S-Header/SHeader";
import { ListGroup } from "react-bootstrap";
import { useContext, useEffect } from "react";
import { Context } from "../../Context.jsx";
import { useParams } from "react-router-dom";

function SAppointment() {
  const { studentToken, appointment, setAppointment, student } =
    useContext(Context);

  const { studentId } = useParams();
  console.log("studentId", studentId);

  // get all appointments

  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${studentToken}`,
      },
    };

    fetch(`http://localhost:6500/api/appointments/${studentId}`, config)
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
        <h3>Your booked appointments</h3>

        <ListGroup>
          <ListGroup.Item>
            {appointment &&
              appointment.map((appointment) => (
                <div key={appointment._id}>
                  <p>
                    <span>Date: </span>
                    <span className="task-input">{appointment.date}</span>
                  </p>
                  <p>
                    <span>Time:</span>
                    <span className="task-input">{appointment.time}</span>{" "}
                  </p>
                  <p>
                    <span>Teacher:</span>
                    <span className="task-input">
                      {appointment.teacher}
                    </span>{" "}
                  </p>
                </div>
              ))}
          </ListGroup.Item>
        </ListGroup>
      </div>
    </div>
  );
}

export default SAppointment;
