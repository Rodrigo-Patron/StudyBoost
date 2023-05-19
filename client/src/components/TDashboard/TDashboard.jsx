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


function TDashboard() {
  const { setErrors, isCollapsed } = useContext(Context);
  const [date, setDate] = useState(new Date().toUTCString());
  const [lastSelectedDate, setLastSelectedDate] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null); // New state for selected date
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
  // Fetch the teacher object and its token from the localStorage
  const teacher = JSON.parse(localStorage.getItem("teacher"));
  const teacherAuthToken = JSON.parse(localStorage.getItem("teacherToken"));
  // Extract teacherId from the teacher object
  const teacherId = teacher._id;
  useEffect(() => {
    const fetchSubmittedDates = async () => {
      try {
        const response = await fetch(
          `http://localhost:6500/api/availability/${teacherId}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${teacherAuthToken}`,
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
        console.error("Error:", error);
        setSubmittedDates([]); // Set submittedDates to an empty array on error
      }
      
    };
    fetchSubmittedDates();
  }, []);
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
    });
    if (foundDate && foundDate.timeSlots) {
      const timeSlotsWithChecked = foundDate.timeSlots.map((timeSlot) => ({
        time: timeSlot,
        checked: false,
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
      } else {
        Swal.fire({
          icon: "error",
          title: "Availability not created",
          text: "Please select your available time!",
        });
      }
      return;
    }
    //to sort by date in frontend
    const dateToSort = new Date(datePicked);
    const formData = {
      date: new Date(datePicked).toLocaleDateString(navigator.language),
      time: timeArr.length === 1 ? timeArr[0] : timeArr,
      dateInMil: Date.parse(dateToSort),
    };
    const config = {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${teacherAuthToken}`,
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
        console.log(result);
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
        console.log(err);
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
            <h6>Please select your available time slots here</h6>
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
                    disabled={submittedTimeSlots["10:00 - 10:30"]}
                  />
                  <Form.Check
                    onChange={checkHandler}
                    disabled={submittedTimeSlots["10:30 - 11:00"]}
                    type={type}
                    id={`default-${type}`}
                    label="10:30 - 11:00"
                    value="10:30 - 11:00"
                    name="timePicked2"
                    checked={timeSlot.timePicked2 === "" ? false : true}
                  />
                  <Form.Check
                    onChange={checkHandler}
                    disabled={submittedTimeSlots["11:00 - 11:30"]}
                    type={type}
                    id={`default-${type}`}
                    label="11:00 - 11:30"
                    value="11:00 - 11:30"
                    name="timePicked3"
                    checked={timeSlot.timePicked3 === "" ? false : true}
                  />
                  <Form.Check
                    onChange={checkHandler}
                    disabled={submittedTimeSlots["11:30 - 12:00"]}
                    type={type}
                    id={`default-${type}`}
                    label="11:30 - 12:00"
                    value="11:30 - 12:00"
                    name="timePicked4"
                    checked={timeSlot.timePicked4 === "" ? false : true}
                  />
                  <Form.Check
                    onChange={checkHandler}
                    disabled={submittedTimeSlots["13:00 - 13:30"]}
                    type={type}
                    id={`default-${type}`}
                    label="13:00 - 13:30"
                    value="13:00 - 13:30"
                    name="timePicked5"
                    checked={timeSlot.timePicked5 === "" ? false : true}
                  />
                  <Form.Check
                    onChange={checkHandler}
                    disabled={submittedTimeSlots["13:30 - 14:00"]}
                    type={type}
                    id={`default-${type}`}
                    label="13:30 - 14:00"
                    value="13:30 - 14:00"
                    name="timePicked6"
                    checked={timeSlot.timePicked6 === "" ? false : true}
                  />
                  <Form.Check
                    onChange={checkHandler}
                    disabled={submittedTimeSlots["14:00 - 14:30"]}
                    type={type}
                    id={`default-${type}`}
                    label="14:00 - 14:30"
                    value="14:00 - 14:30"
                    name="timePicked7"
                    checked={timeSlot.timePicked7 === "" ? false : true}
                  />
                  <Form.Check
                    onChange={checkHandler}
                    disabled={submittedTimeSlots["14:30 - 15:00"]}
                    type={type}
                    id={`default-${type}`}
                    label="14:30 - 15:00"
                    value="14:30 - 15:00"
                    name="timePicked8"
                    checked={timeSlot.timePicked8 === "" ? false : true}
                  />
                </div>
              ))}
              <Button type="submit">Submit</Button>
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



