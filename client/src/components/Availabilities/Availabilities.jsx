import React from "react";
import "./Availabilities.scss";
import { Button, ListGroup, Form } from "react-bootstrap";
import { useContext, useEffect, useRef, useState } from "react";
import { Context } from "../../Context.jsx";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Availabilities() {
  const { studentToken, setAvailability, availability, setErrors } =
    useContext(Context);
  //^ NAVIGATE
  const navigate = useNavigate();
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
    alert("Appointment booked");
    navigate("/studentDashboard");
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

  const timeList = () => {
    return (
      <div className="availabilities">
        <div className="av-header">
          <h3>Book your appointment with {availability[0].teacher?.name}</h3>{" "}
          <Button
            className="back-btn"
            size="sm"
            onClick={(e) => {
              navigate("/studentDashboard");
            }}
          >
            Back to dashboard
          </Button>
        </div>
        <ListGroup>
          <ListGroup.Item>
            {" "}
            {availability.map((appointment) => (
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
                <Button
                  size="sm"
                  disabled
                  type="submit"
                  className="confirm-btn"
                >
                  Confirm
                </Button>
                <hr />
              </Form>
            ))}
          </ListGroup.Item>
        </ListGroup>
      </div>
    );
  };

  const slotsAvailable = availability && availability.length;
  const display = slotsAvailable ? timeList() : "No slots available";

  return display;
}

export default Availabilities;
