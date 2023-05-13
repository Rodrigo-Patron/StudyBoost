import React from "react";
import "./TAvailabilities.scss";
import { Button, ListGroup, Form, Container, Col } from "react-bootstrap";
import { useContext, useEffect, useRef, useState } from "react";
import { Context } from "../../Context.jsx";
import Swal from "sweetalert2";
import THeader from "../T-Header/THeader";

function TAvailabilities() {
  const { setAvailability, availability, teacherToken, teacher } =
    useContext(Context);
  const [query, setQuery] = useState("");
  const [reqAgain, setReqAgain] = useState(false);
  const [counter, setCounter] = useState(0);

  // console.log("teacherId", teacherId);
  const [selectedTime, setSelectedTime] = useState({
    date: "",
    time: "",
  });

  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${teacherToken}`,
      },
    };

    fetch(`http://localhost:6500/api/availability/${teacher._id}`, config)
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
  }, [reqAgain, counter]);

  const dateInput = useRef();

  // to delete availability
  const submitHandler = (e) => {
    e.preventDefault();

    const data = {
      teacher: teacher._id,
      date: selectedTime.date,
      time: selectedTime.time,
    };
    console.log("DATA", data);
    const config = {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${teacherToken}`,
      },
    };

    fetch("http://localhost:6500/api/availability/deleteAvailability", config)
      .then((res) => {
        if (res.ok) {
          return Swal.fire({
            icon: "success",
            title: "Good job",
            text: "Availability removed",
          });
        }
        return res.json();
      })
      .then((result) => {
        // console.log(result);
        setCounter(counter + 1);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const t = (e) => {
    // console.log(
    //   e.target.parentElement.parentElement.parentElement.parentElement
    //     .children[3]
    // );
    e.target.parentElement.parentElement.parentElement.parentElement.children[3].disabled = false;

    if (e.target.checked) {
      setSelectedTime({
        time: e.target.value,
        date: e.target.getAttribute("data"),
      });
      console.log("TIME", selectedTime.time);
    }
  };
  const timeList = () => {
    return (
      <div>
        <Container className="availabilities">
          <div className="top-header">
            <h3>Your set availability</h3>{" "}
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
                            type="checkbox"
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
                      className="delete-btn"
                    >
                      Delete
                    </Button>
                  </Form>
                ))}
            </ListGroup.Item>
          </ListGroup>
        </Container>
      </div>
    );
  };

  const noSlots = () => {
    return (
      <Container className="noSlots">
        <h3>Your set availability</h3>
        <p>There is no availability</p>
      </Container>
    );
  };
  const slotsAvailable = availability && availability.length;
  const display = slotsAvailable ? timeList() : noSlots();

  return (
    <div>
      <Col>
        <THeader />
      </Col>
      {display}
    </div>
  );
}

export default TAvailabilities;
