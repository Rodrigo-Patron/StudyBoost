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
  const [selectedTime, setSelectedTime] = useState([]);

  const dateInput = useRef();

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

  // to delete availability
  const submitHandler = (e) => {
    e.preventDefault();

    selectedTime.forEach((selected) => {
      const data = {
        teacher: teacher._id,
        date: selected.date,
        time: selected.time,
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
          setCounter(counter + 1);
        })
        .catch((err) => {
          console.log(err);
        });
    });
  };

  const t = (e) => {
    e.target.parentElement.parentElement.parentElement.parentElement.children[3].disabled = false;

    const selectedDate = e.target.getAttribute("data");
    const selectedTimeSlot = e.target.value;
    const existingSelectedDateIndex = selectedTime.findIndex(
      (date) => date.date === selectedDate
    );
    if (e.target.checked) {
      // Add the selected time slot to the selected date
      if (existingSelectedDateIndex === -1) {
        setSelectedTime([
          ...selectedTime,
          {
            date: selectedDate,
            time: [selectedTimeSlot],
          },
        ]);
      } else {
        const existingSelectedTimeSlots =
          selectedTime[existingSelectedDateIndex].time;
        setSelectedTime([
          ...selectedTime.slice(0, existingSelectedDateIndex),
          {
            ...selectedTime[existingSelectedDateIndex],
            time: [...existingSelectedTimeSlots, selectedTimeSlot],
          },
          ...selectedTime.slice(existingSelectedDateIndex + 1),
        ]);
      }
    } else {
      // Remove the selected time slot from the selected date
      const existingSelectedTimeSlots =
        selectedTime[existingSelectedDateIndex].time;
      if (existingSelectedTimeSlots.length === 1) {
        setSelectedTime([
          ...selectedTime.slice(0, existingSelectedDateIndex),
          ...selectedTime.slice(existingSelectedDateIndex + 1),
        ]);
      } else {
        setSelectedTime([
          ...selectedTime.slice(0, existingSelectedDateIndex),
          {
            ...selectedTime[existingSelectedDateIndex],
            time: existingSelectedTimeSlots.filter(
              (time) => time !== selectedTimeSlot
            ),
          },
          ...selectedTime.slice(existingSelectedDateIndex + 1),
        ]);
      }
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
