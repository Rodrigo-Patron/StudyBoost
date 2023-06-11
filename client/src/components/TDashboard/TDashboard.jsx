import React, { useState, useEffect } from "react";
import "react-calendar/dist/Calendar.css";
import "./TDashboard.scss";
import Calendar from "react-calendar";
import { useContext } from "react";
import { Button, Form, Row, Col, Card, Container } from "react-bootstrap";
import { Context } from "../../Context.jsx";
import THeader from "../T-Header/THeader";
import Swal from "sweetalert2";
import TNavbar from "../TNavbar/TNavbar";
import { useNavigate } from "react-router-dom";

function TDashboard() {
  const {
    setErrors,
    isCollapsed,
    teacher,

    teacherToken,
  } = useContext(Context);
  const [date, setDate] = useState(new Date().toUTCString());
  const [setLastSelectedDate] = useState(null);
  const [setSelectedDate] = useState(null); // New state for selected date
  const [timeSlot, setTimeSlot] = useState({
    timePicked1: "",
    timePicked2: "",
    timePicked3: "",
    timePicked4: "",
    timePicked5: "",
    timePicked6: "",
    timePicked7: "",
    timePicked8: "",
  });
  const [submittedDates, setSubmittedDates] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSubmittedDates = async () => {
      try {
        const response = await fetch(
          `http://localhost:6500/api/availability/${teacher._id}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${teacherToken}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch submitted dates");
        }
        const data = await response.json();

        if (!Array.isArray(data)) {
          throw new Error("Data is not an array");
        }
        setSubmittedDates(data);
        localStorage.setItem("submittedDates", JSON.stringify(data));
      } catch (error) {
        setSubmittedDates([]); // Set submittedDates to an empty array on error
      }
    };
    fetchSubmittedDates();
  }, [date]);

  const dateHandler = (date) => {
    setDate(date);
    const formattedDate = date.toLocaleDateString(navigator.language);
    const foundDate = submittedDates.find(
      (submittedDate) => submittedDate.date === formattedDate
    );
    // I added this for the alert after selecting the date
    Swal.fire({
      icon: "success",
      title: "Date selected",
      text: "Please select your available time!",
    }).then(() => {});
    if (foundDate && foundDate.timeSlots) {
      const timeSlotsWithChecked = foundDate.timeSlots.map((timeSlot) => ({
        time: timeSlot,
        checked: false,
        disabled: true,
      }));
      setSelectedDate({
        date: foundDate.date,
        timeSlots: timeSlotsWithChecked,
      });
    } else {
      setSelectedDate(null);
    }
  };
  const checkHandler = (e) => {
    const time = e.target.value;
    const isChecked = e.target.checked;
    if (isChecked) {
      setTimeSlot({
        ...timeSlot,
        [e.target.name]: time,
      });
    } else {
      setTimeSlot({
        ...timeSlot,
        [e.target.name]: "",
      });
    }
    // Check if the time slot was previously submitted
    const isSubmitted = submittedDates.some(
      (submittedDate) =>
        submittedDate.timeSlots && submittedDate.timeSlots.includes(time)
    );
    if (isChecked && isSubmitted) {
      alert("This timeslot was previously submitted.");
    }
  };
  const submittedTimeSlots = {};
  if (Array.isArray(submittedDates)) {
    submittedDates.forEach((submittedDate) => {
      if (submittedDate.timeSlots) {
        submittedDate.timeSlots.forEach((timeSlot) => {
          // console.log(
          //   "SubmittedDates",
          //   submittedDates,
          //   "submittedDate",
          //   submittedDate,
          //   "timeSlot",
          //   timeSlot
          // );
          submittedTimeSlots[timeSlot] = true;
        });
      }
    });
  }

  const tileClassName = ({ date, view }) => {
    if (view === "month") {
      const formattedDate = date.toLocaleDateString(navigator.language);
      const foundDate = submittedDates.find(
        (submittedDate) => submittedDate.date === formattedDate
      );
      if (foundDate) {
        return "submitted-date";
      }
    }
    return null;
  };
  function submitHandler(e) {
    e.preventDefault();
    const datePicked = date;
    if (!datePicked) {
      alert("Please select the date");
      return;
    }
    const timeArr = [];
    for (const key in timeSlot) {
      if (timeSlot[key] && timeSlot[key] !== "") {
        timeArr.push(timeSlot[key]);
        Swal.fire({
          icon: "success",
          title: "Availability created",
          text: "Your availability was created successfully!",
        });
      }
    }

    //to sort by date in frontend
    const dateToSort = new Date(datePicked);
    const formData = {
      date: new Date(datePicked).toLocaleDateString(navigator.language),
      // what is this commented line ?
      // time: timeArr.length === 1 ? [timeArr[0]] : timeArr,
      time: timeArr,
      dateInMil: Date.parse(dateToSort),
    };
    console.log("FormData:", formData);
    if (timeArr.length === 0) {
      return Swal.fire({
        icon: "error",
        title: "Availability not created",
        text: "Please select your available time!",
      });
    }
    const config = {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${teacherToken}`,
      },
    };
    fetch("http://localhost:6500/api/availability", config)
      .then((res) => {
        if (!res.ok) {
          return res.json().then((err) => {
            alert(err.message);
            setErrors(err);
          });
        }
        return res.json();
      })
      .then((result) => {
        console.log("Server: ", result);
        setLastSelectedDate({ date: result.date, time: result.time });
        // Add the submitted date to submittedDates state
        const updatedSubmittedDates = [
          ...submittedDates,
          { date: result.date, timeSlots: result.time },
        ];
        setSubmittedDates(updatedSubmittedDates);
        // Update the localStorage with the updated submittedDates
        localStorage.setItem(
          "submittedDates",
          JSON.stringify(updatedSubmittedDates)
        );
        // Clear the timeSlot state after a successful submission
        setTimeSlot({
          timePicked1: "",
          timePicked2: "",
          timePicked3: "",
          timePicked4: "",
          timePicked5: "",
          timePicked6: "",
          timePicked7: "",
          timePicked8: "",
        });
      })
      .catch((err) => {
        setErrors(err);
      });
  }

  const headerWidth = isCollapsed ? 2 : 1;
  const remainingWidth = 12 - headerWidth;

  return (
    <Container fluid={true} className="Dashboard-container">
      <Row className="Dashboard-row">
        <Col className="navbarCol">
          <TNavbar />
        </Col>
        <Col className="headerCol" xs="12" md={headerWidth}>
          <THeader />
        </Col>
        <Col className="appointments" xs="12" md={remainingWidth}>
          <div className="pickdate">
            <Card className="teachers-dashboard">
              <Card.Body>
                <h2>Teacher's dashboard</h2>
              </Card.Body>
            </Card>
            <Container>
              <Row className="date-time">
                {/* column for the date */}
                <Col sm={6}>
                  <Form onSubmit={submitHandler}>
                    <Calendar
                      onChange={dateHandler}
                      value={date.toString()}
                      tileClassName={tileClassName}
                    />
                  </Form>
                </Col>
                {/* column for the time slot */}
                <Col sm={6}>
                  <h6>Please select your available time slots here:</h6>
                  <Form onSubmit={submitHandler}>
                    {["checkbox"].map((type) => (
                      <div key={`default-${type}`} className="mb-3">
                        <Form.Check
                          onChange={checkHandler}
                          type={type}
                          id={`default-${type}`}
                          label="10:00 - 10:30"
                          value="10:00 - 10:30"
                          name="timePicked1"
                          checked={timeSlot.timePicked1 === "" ? false : true}
                          disabled={
                            submittedDates.find(
                              (d) =>
                                new Date(d.date).getDate() ==
                                  new Date(date).getDate() &&
                                (d.time
                                  ? d.time.includes("10:00 - 10:30")
                                  : false)
                            )
                              ? true
                              : false
                          }
                        />
                        <Form.Check
                          onChange={checkHandler}
                          type={type}
                          id={`default-${type}`}
                          label="10:30 - 11:00"
                          value="10:30 - 11:00"
                          name="timePicked2"
                          checked={timeSlot.timePicked2 === "" ? false : true}
                          disabled={
                            submittedDates.find(
                              (d) =>
                                new Date(d.date).getDate() ==
                                  new Date(date).getDate() &&
                                (d.time
                                  ? d.time.includes("10:30 - 11:00")
                                  : false)
                            )
                              ? true
                              : false
                          }
                        />
                        <Form.Check
                          onChange={checkHandler}
                          type={type}
                          id={`default-${type}`}
                          label="11:00 - 11:30"
                          value="11:00 - 11:30"
                          name="timePicked3"
                          checked={timeSlot.timePicked3 === "" ? false : true}
                          disabled={
                            submittedDates.find(
                              (d) =>
                                new Date(d.date).getDate() ==
                                  new Date(date).getDate() &&
                                (d.time
                                  ? d.time.includes("11:00 - 11:30")
                                  : false)
                            )
                              ? true
                              : false
                          }
                        />
                        <Form.Check
                          onChange={checkHandler}
                          type={type}
                          id={`default-${type}`}
                          label="11:30 - 12:00"
                          value="11:30 - 12:00"
                          name="timePicked4"
                          checked={timeSlot.timePicked4 === "" ? false : true}
                          disabled={
                            submittedDates.find(
                              (d) =>
                                new Date(d.date).getDate() ==
                                  new Date(date).getDate() &&
                                (d.time
                                  ? d.time.includes("11:30 - 12:00")
                                  : false)
                            )
                              ? true
                              : false
                          }
                        />
                        <Form.Check
                          onChange={checkHandler}
                          type={type}
                          id={`default-${type}`}
                          label="13:00 - 13:30"
                          value="13:00 - 13:30"
                          name="timePicked5"
                          checked={timeSlot.timePicked5 === "" ? false : true}
                          disabled={
                            submittedDates.find(
                              (d) =>
                                new Date(d.date).getDate() ==
                                  new Date(date).getDate() &&
                                (d.time
                                  ? d.time.includes("13:00 - 13:30")
                                  : false)
                            )
                              ? true
                              : false
                          }
                        />
                        <Form.Check
                          onChange={checkHandler}
                          type={type}
                          id={`default-${type}`}
                          label="13:30 - 14:00"
                          value="13:30 - 14:00"
                          name="timePicked6"
                          checked={timeSlot.timePicked6 === "" ? false : true}
                          disabled={
                            submittedDates.find(
                              (d) =>
                                new Date(d.date).getDate() ==
                                  new Date(date).getDate() &&
                                (d.time
                                  ? d.time.includes("13:30 - 14:00")
                                  : false)
                            )
                              ? true
                              : false
                          }
                        />
                        <Form.Check
                          onChange={checkHandler}
                          type={type}
                          id={`default-${type}`}
                          label="14:00 - 14:30"
                          value="14:00 - 14:30"
                          name="timePicked7"
                          checked={timeSlot.timePicked7 === "" ? false : true}
                          disabled={
                            submittedDates.find(
                              (d) =>
                                new Date(d.date).getDate() ==
                                  new Date(date).getDate() &&
                                (d.time
                                  ? d.time.includes("14:00 - 14:30")
                                  : false)
                            )
                              ? true
                              : false
                          }
                        />
                        <Form.Check
                          onChange={checkHandler}
                          type={type}
                          id={`default-${type}`}
                          label="14:30 - 15:00"
                          value="14:30 - 15:00"
                          name="timePicked8"
                          checked={timeSlot.timePicked8 === "" ? false : true}
                          disabled={
                            submittedDates.find(
                              (d) =>
                                new Date(d.date).getDate() ==
                                  new Date(date).getDate() &&
                                (d.time
                                  ? d.time.includes("14:30 - 15:00")
                                  : false)
                            )
                              ? true
                              : false
                          }
                        />
                      </div>
                    ))}
                    <Button className="submit-btn" type="submit">
                      Submit
                    </Button>
                  </Form>
                </Col>
              </Row>
            </Container>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
export default TDashboard;
