import React from "react";
import "./Availabilities.scss";
import { Button, ListGroup, Form } from "react-bootstrap";
import { useContext, useEffect, useRef, useState } from "react";
import { Context } from "../../Context.jsx";
import { useParams } from "react-router-dom";

function Availabilities() {
  const { studentToken, setAvailability, availability, setErrors } =
    useContext(Context);

  const { teacherId } = useParams();
  // console.log("teacherId", teacherId);
  const [selectedTime, setSelectedTime] = useState({
    time: "",
    date: "",
  });

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

  const dateInput = useRef();

  // to create appointments
  const submitHandler = (e) => {
    e.preventDefault();

    //console.log(e.target.value);

    const data = {
      teacher: teacherId,
      date: selectedTime.date,
      time: selectedTime.time,
    };
    // console.log(data);
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
        // console.log("result:", result);
      })
      .catch((err) => {
        setErrors(err);
        // console.log(err);
      });
  };

  const t = (e) => {
    // console.log(
    //   e.target.parentElement.parentElement.parentElement.parentElement
    //     .children[3]
    // );
    e.target.parentElement.parentElement.parentElement.parentElement.children[3].disabled = false;
    setSelectedTime({
      time: e.target.value,
      date: e.target.getAttribute("data"),
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
              <Form onSubmit={submitHandler} key={appointment._id}>
                <p>
                  <span>Date:</span>{" "}
                  <i ref={dateInput}>
                    {new Date(appointment.date).toLocaleDateString("de-DE")}
                  </i>
                </p>
                <span>Time slots:</span>
                <ul>
                  <li>
                    {appointment.time.map((time, index) => (
                      <Form.Check
                        onChange={t}
                        key={index}
                        type="radio"
                        label={time}
                        value={time}
                        name="time"
                        inline
                        data={appointment.date}
                      />
                    ))}
                  </li>
                </ul>
                <Button disabled type="submit" className="confirmBtn">
                  Confirm
                </Button>
                {/* <Button className="cancelBtn">Cancel</Button> */}
                <hr />
              </Form>
            ))}
        </ListGroup.Item>
      </ListGroup>
    </div>
  );
}

export default Availabilities;
