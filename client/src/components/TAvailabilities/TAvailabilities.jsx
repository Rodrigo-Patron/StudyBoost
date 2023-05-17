import React from "react";
import "./TAvailabilities.scss";
import { Button, ListGroup, Form, Container, Col, Row } from "react-bootstrap";
import { useContext, useEffect, useRef, useState } from "react";
import { Context } from "../../Context.jsx";
import Swal from "sweetalert2";
import THeader from "../T-Header/THeader";
import TNavbar from "../TNavbar/TNavbar";


function TAvailabilities() {
  const { setAvailability, availability, teacherToken, teacher, isCollapsed } =
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
  }, [reqAgain, counter, selectedTime]);

  const resetCheckBoxes = (e) => {
    console.log(e.children[2][0]);
    Array.from(e.children[2]).forEach((it) => {
      console.log("UnChecking", it);
      it.children[0].children[0].children[0].checked = false;
    });
  };
  // to delete availability
  const submitHandler = (e) => {
    const date = e.target.getAttribute("data");
    e.preventDefault();
    console.log(date);

    //selectedTime.forEach((selected) => {
    // const data = {
    //   teacher: teacher._id,
    //   date: selected.date,
    //   time: selected.time,
    // };
    const data = selectedTime.filter((t) => t.date === date)[0];
    // console.log("DATA", data);

    const config = {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${teacherToken}`,
      },
    };

    setSelectedTime(selectedTime.filter((t) => t.date !== date));
    fetch("http://localhost:6500/api/availability/deleteAvailability", config)
      .then((res) => {
        if (res.ok) {
          setCounter(counter + 1);
          return Swal.fire({
            icon: "success",
            title: "Good job",
            text: "Availability removed",
          }).then(() => {
            console.log("After fetch: ", selectedTime);
            setSelectedTime(selectedTime.filter((t) => t.date !== date));
            setTimeout(() => {
              resetCheckBoxes(e.target);
            }, 1000);
          });
        }
        return res.json();
      })
      .then((result) => {})
      .catch((err) => {
        console.log(err);
      });
    //});
    //console.log("DELETE ORDER: ", data);
    //setSelectedTime(selectedTime.filter((t) => t.date !== data.date));
  };

  const t = (e) => {
    // e.target.checked = !e.target.checked;
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
      if (selectedTime[existingSelectedDateIndex]) {
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
    }
    console.log("SelectedTime: ", selectedTime);
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
                  <Form
                    onSubmit={submitHandler}
                    data={appointment.date}
                    key={appointment._id}
                  >
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
                            // checked={false}
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

  const headerWidth = isCollapsed ? 2 : 1;
  const remainingWidth = 12 - headerWidth;
  return (

    <Container fluid={true} className="availabilities-container">
      <Row className="availabilities-row">
      <Col className="navbarCol">
        <TNavbar />
        </Col>
        <Col className="headerCol" xs="12" md={headerWidth}>
          <THeader />
        </Col>
        <Col className="appointments" xs="12" md={remainingWidth}>
           {display}
          </Col>
    
      </Row>
    </Container>
  );
}

export default TAvailabilities;
