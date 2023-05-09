import React from "react";
import "./Availabilities.scss";
import { Button, ListGroup, Form, Container, Row } from "react-bootstrap";
import { useContext, useEffect, useRef, useState } from "react";
import { Context } from "../../Context.jsx";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function Availabilities() {
  const { studentToken, setAvailability, availability, setErrors } =
    useContext(Context);
  const [query, setQuery] = useState("");
  const [reqAgain, setReqAgain] = useState(false);

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
        console.log(result);

        if (result.requestAgain) {
          setAvailability(result.findAvailability1);
          setReqAgain(!reqAgain);
        } else {
          setAvailability(result);
        }
      });
  }, [reqAgain]);

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
        if (res.status === 400) {
          return Swal.fire({
            icon: "error",
            title: "Booking failed",
            text: "Time already booked",
          });
        } else if (res.status === 200) {
          return Swal.fire({
            icon: "success",
            title: "Good job",
            text: "Appointment booked",
          });
        }
        return res.json();
      })
      .then((result) => {
        navigate("/studentDashboard");
        // console.log(result);
      })
      .catch((err) => {
        // console.log(err, "coming from catch");
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

  const timeList = () => {
    return (
      <Container className="availabilities">
        <div className="top-header">
          <h4>
            Book your appointment with{" "}
            <span>{availability[0].teacher?.name}</span>
          </h4>{" "}
          <div className="search-bar">
            <label>Search date: </label>{" "}
            <input type="date" onChange={(e) => setQuery(e.target.value)} />
          </div>
        </div>
        <ListGroup>
          <ListGroup.Item>
            {availability
              .filter((appointment) => {
                if (query === "") {
                  return appointment;
                } else if (
                  new Date(appointment.date)
                    .toLocaleDateString(navigator.language)

                    .includes(
                      new Date(query).toLocaleDateString(navigator.language)
                    )
                ) {
                  return appointment;
                }
              })
              .map((appointment) => (
                <Form onSubmit={submitHandler} key={appointment._id}>
                  <p>
                    <span>Date:</span>{" "}
                    <i ref={dateInput} className="date-output">
                      {new Date(appointment.date).toLocaleDateString(
                        navigator.language
                      )}
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
                  {/* <hr /> */}
                </Form>
              ))}
          </ListGroup.Item>
        </ListGroup>
        <Button
          className="back-btn"
          onClick={(e) => {
            navigate("/studentDashboard");
          }}
        >
          Back to dashboard
        </Button>
      </Container>
    );
  };

  const slotsAvailable = availability && availability.length;
  const display = slotsAvailable ? timeList() : "No slots available";

  return display;
}

export default Availabilities;
