import React from "react";
import "./Availabilities.scss";
import { Button, ListGroup } from "react-bootstrap";
import { useContext, useEffect, useRef } from "react";
import { Context } from "../../Context.jsx";
import { useParams } from "react-router-dom";

function Availabilities() {
  const { studentToken, setAvailability, availability, setErrors } =
    useContext(Context);

  const { teacherId } = useParams();
  // console.log("teacherId", teacherId);

  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${studentToken}`,
      },
    };

    fetch(`http://localhost:6500/api/availability/${teacherId}`, config)
      .then((res) => {
        if (!res.ok) {
          res.json().then((err) => console.log(err));
          return;
        }

        return res.json();
      })
      .then((result) => {
        // console.log("result:", result);
        setAvailability(result);
      });
  }, []);

  const timeInput = useRef();
  const dateInput = useRef();

  // to create appointments
  const submitHandler = (e) => {
    e.preventDefault();

    const data = {
      teacher: teacherId,
      date: e.target.value,
      time: e.target.value,
    };
    console.log(data);
    const config = {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${studentToken}`,
      },
    };

    fetch("http://localhost:6500/api/appointments", config)
      .then((res) => {
        if (!res.ok) {
          return res.json().then((err) => {
            console.log(err);
            setErrors(err);
          });
        }
        return res.json();
      })
      .then((result) => {
        console.log("result:", result);
      })
      .catch((err) => {
        setErrors(err);
        // console.log(err);
      });
  };

  return (
    <div>
      <h2>Selected teacher time slots</h2>
      <ListGroup>
        {availability && availability[0].teacher.name}
        <ListGroup.Item>
          {availability &&
            availability.map((appointment) => (
              <div key={appointment._id}>
                <p ref={dateInput}>
                  <span>Date:</span> {appointment.date.split("T")[0]}
                </p>
                <span>Time slots:</span>
                <ul>
                  <li>
                    {appointment.time.map((time) => (
                      // <li>
                      <Button ref={timeInput} className="selectedTime">
                        {time}
                      </Button>
                      // </li>
                    ))}
                  </li>
                </ul>
                <Button onClick={submitHandler} className="confirmBtn">
                  Confirm
                </Button>
                <Button className="cancelBtn">Cancel</Button>
                <hr />
              </div>
            ))}
        </ListGroup.Item>
      </ListGroup>
    </div>
  );
}

export default Availabilities;
