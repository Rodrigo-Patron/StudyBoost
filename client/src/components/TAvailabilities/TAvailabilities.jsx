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
  const [counter, setCounter] = useState(false);
  const [selectedTime, setSelectedTime] = useState([]);
  // const [checked, setChecked] = useState(false);

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

  // to delete availability
  const submitHandler = (e, deletingDate) => {
    e.preventDefault();
    // const date = e.target.getAttribute("data");

    console.log(deletingDate);

    const filtering = selectedTime.filter((time) => time.date === deletingDate);

    const filtering2 = selectedTime.filter(
      (time) => time.date !== deletingDate
    );
    setSelectedTime(filtering2);
    console.log("FILTER", filtering);

    const data = { date: deletingDate, time: filtering.map((x) => x.time) };
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
        console.log(res.ok);

        return res.json();
      })
      .then((result) => {
        console.log(result);

        return Swal.fire({
          icon: "success",
          title: "Good job",
          text: "Availability removed",
        }).then(() => {
          // window.location.reload();
          setCounter(!counter);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const t = (e, time, date) => {
    // console.log("Time", time);
    // console.log("Date", date);
    // console.log("TARGET", e.target.checked);

    if (e.target.checked) {
      setSelectedTime([
        ...selectedTime,
        {
          date: date,
          time: time,
        },
      ]);
    } else {
      const filterTime = selectedTime.filter(
        (timeObj) =>
          (timeObj.date === date && timeObj.time !== time) ||
          timeObj.date !== date
      );
      setSelectedTime(filterTime);
      console.log("FT", filterTime);
    }
  };
  console.log("SelectedTime: ", selectedTime);
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
                    onSubmit={(e) => submitHandler(e, appointment.date)}
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
                            onChange={(e) => t(e, time, appointment.date)}
                            key={index}
                            // checked={selectedTime.forEach((x) => {
                            //   x.time === time && x.date === appointment.date;
                            // })}
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
                      // disabled
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
