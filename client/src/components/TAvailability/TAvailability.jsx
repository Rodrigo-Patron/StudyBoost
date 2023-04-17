// import React, { useState } from "react";
// import "./TAvailability.scss";
// import "@mobiscroll/react/dist/css/mobiscroll.min.css";
// import { Datepicker, Page, setOptions, localeDe } from "@mobiscroll/react";
// import "font-awesome/css/font-awesome.min.css";
// import { useContext, useRef } from "react";
// import { Context } from "../../Context.jsx";
// import THeader from "../T-Header/THeader";

// setOptions({
//   locale: localeDe,
//   theme: "ios",
//   themeVariant: "light",
// });

// function TAvailability({ menuCollapse }) {
//   const inputProps = {
//     placeholder: "Please Select...",
//   };

//   const boxInputProps = {
//     label: "Range",
//     labelStyle: "stacked",
//     inputStyle: "outline",
//     placeholder: "Please Select...",
//   };

//   const [selectedDate, setSelectedDate] = useState(null);
//   const [selectedTime, setSelectedTime] = useState(null);
//   const { setErrors } = useContext(Context);

//   const calendarInput = useRef();

//   function submitHandler() {
//     const date = calendarInput.current._valueText.split(" ")[0];
//     const time = calendarInput.current._valueText.split(" ")[1];

//     const teacherAuthToken = JSON.parse(localStorage.getItem("teacherToken"));

//     const formData = {
//       date: date,
//       time: time,
//     };

//     const config = {
//       method: "POST",
//       body: JSON.stringify(formData),
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${teacherAuthToken}`,
//       },
//     };

//     fetch("http://localhost:6500/api/availability", config)
//       .then((res) => {
//         if (!res.ok) {
//           return res.json().then((err) => {
//             alert(err.message);
//             setErrors(err);
//           });
//         }
//         return res.json();
//       })
//       .then((result) => {
//         console.log("result:", result);
//         setSelectedDate(result.date);
//         setSelectedTime(result.time);
//       })
//       .catch((err) => {
//         setErrors(err);
//         console.log(err);
//       });
//   }

//   return (
//     <>
//       <THeader />
//       <Page>
//         <h1 className="page-title">Teacher Dashboard</h1>

//         <div
//           className="container"
//           style={{
//             marginLeft: menuCollapse ? "80px" : "300px",
//             transition: "margin-left 0.3s",
//           }}
//         >
//           <section className="upcoming-appointments">
//             <h2>Upcoming Appointments</h2>
//           </section>
//           <section className="calendar">
//             <h2>Select Your Availability</h2>
//             <div className="calendar-container">
//               <Datepicker
//                 controls={["calendar", "timegrid"]}
//                 ref={calendarInput}
//                 dateFormat="DD.MM.YYYY"
//                 timeFormat="HH:mm"
//                 display="inline"
//               />
//               <button
//                 type="submit"
//                 className="submit-button"
//                 onClick={submitHandler}
//               >
//                 Submit Availability
//               </button>
//             </div>
//           </section>
//         </div>{" "}
//         <p> {selectedTime}</p>
//         <p>{selectedDate}</p>
//       </Page>
//     </>
//   );
// }

// export default TAvailability;

import React, { useState } from "react";
import "react-calendar/dist/Calendar.css";
import "./TAvailability.scss";
import Calendar from "react-calendar";
import { useContext } from "react";
import { Button, Form, Row, Col, Card } from "react-bootstrap";
import { Context } from "../../Context.jsx";
import THeader from "../T-Header/THeader";

function TAvailability() {
  const { setErrors } = useContext(Context);
  const [date, setDate] = useState(new Date().toUTCString());
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
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
  // console.log("timeSlot", timeSlot);

  const dateHandler = (date) => {
    setDate(date);
  };

  const checkHandler = (e) => {
    console.log(e.target.name);
    const value = e.target.value;
    setTimeSlot({
      ...timeSlot,
      [e.target.name]: value,
    });
  };

  function submitHandler(e) {
    e.preventDefault();
    // const datePicked = calendarInput.current.value;
    const datePicked = date;
    console.log(datePicked);
    if (!datePicked) {
      alert("Please select the date");
      return;
    }

    const teacherAuthToken = JSON.parse(localStorage.getItem("teacherToken"));

    const timeArr = [];
    for (const key in timeSlot) {
      console.log(timeSlot[key]);
      if (timeSlot[key]) {
        timeArr.push(timeSlot[key]);
      }
    }
    const formData = {
      date: datePicked,
      time: timeArr,
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
            // console.log(err);
            alert(err.message);
            setErrors(err);
          });
        }
        return res.json();
      })
      .then((result) => {
        // console.log("result:", result);

        const correctDate = new Date(
          new Date(result.date).getTime() + 86400000
        ).toISOString();

        setSelectedDate(correctDate);
        setSelectedTime(result.time);
      })
      .catch((err) => {
        setErrors(err);
        console.log(err);
      });
    // console.log(datePicked);
  }

  return (
    <div className="pickdate">
      <Card className="teachers-dashboard">
        <THeader />
        <Card.Body>
          <h2>Teacher's dashboard</h2>
        </Card.Body>
      </Card>
      <Row className="date-time">
        <Col sm={8}>
          <Form onSubmit={submitHandler}>
            <Calendar
              // ref={calendarInput}
              onChange={dateHandler}
              value={date.toString()}
            />
            <h6>Please select your available time slots here</h6>
            {["checkbox"].map((type) => (
              <div key={`default-${type}`} className="mb-3">
                <Form.Check
                  onChange={checkHandler}
                  type={type}
                  id={`default-${type}`}
                  label="10:00 - 10:30"
                  value="10:00 - 10:30"
                  name="timePicked1"
                />
                <Form.Check
                  onChange={checkHandler}
                  type={type}
                  id={`default-${type}`}
                  label="10:30 - 11:00"
                  value="10:30 - 11:00"
                  name="timePicked2"
                />
                <Form.Check
                  onChange={checkHandler}
                  type={type}
                  id={`default-${type}`}
                  label="11:00 - 11:30"
                  value="11:00 - 11:30"
                  name="timePicked3"
                />
                <Form.Check
                  onChange={checkHandler}
                  type={type}
                  id={`default-${type}`}
                  label="11:30 - 12:00"
                  value="11:30 - 12:00"
                  name="timePicked4"
                />
                <Form.Check
                  onChange={checkHandler}
                  type={type}
                  id={`default-${type}`}
                  label="13:00 - 13:30"
                  value="13:00 - 13:30"
                  name="timePicked5"
                />
                <Form.Check
                  onChange={checkHandler}
                  type={type}
                  id={`default-${type}`}
                  label="13:30 - 14:00"
                  value="13:30 - 14:00"
                  name="timePicked6"
                />
                <Form.Check
                  onChange={checkHandler}
                  type={type}
                  id={`default-${type}`}
                  label="14:00 - 14:30"
                  value="14:00 - 14:30"
                  name="timePicked7"
                />
                <Form.Check
                  onChange={checkHandler}
                  type={type}
                  id={`default-${type}`}
                  label="14:30 - 15:00"
                  value="14:30 - 15:00"
                  name="timePicked8"
                />
              </div>
            ))}
            <Button type="submit">Submit</Button>
          </Form>
        </Col>
        <Col sm={4}>
          <h5>Upcoming appointments</h5>
        </Col>
      </Row>
      <Row className="selected">
        <h4>Selected date and time</h4>

        <p>
          <span>Date </span>:{" "}
          <span className="task-input">
            {selectedDate && selectedDate.split("T")[0]}
          </span>
        </p>
        {selectedTime &&
          selectedTime.map((time) => (
            <div key={time}>
              <p>
                <span>Time </span>: <span className="task-input">{time}</span>
              </p>
            </div>
          ))}
      </Row>
    </div>
  );
}

export default TAvailability;
