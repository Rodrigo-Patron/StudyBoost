import React, { useState } from "react";
import "./TAvailability.scss";
import "@mobiscroll/react/dist/css/mobiscroll.min.css";
import { Datepicker, Page, setOptions, localeDe,  } from "@mobiscroll/react";
import "font-awesome/css/font-awesome.min.css";
import { useContext, useRef } from "react";
import { Context } from "../../Context.jsx";
import THeader from "../T-Header/THeader";

setOptions({
  locale: localeDe,
  theme: "ios",
  themeVariant: "light",
});

function TAvailability() {
  const inputProps = {
    placeholder: "Please Select...",
  };

  const boxInputProps = {
    label: "Range",
    labelStyle: "stacked",
    inputStyle: "outline",
    placeholder: "Please Select...",
  };

  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const { setErrors } = useContext(Context);

const calendarInput = useRef()


  function submitHandler() {
    const date = calendarInput.current._valueText.split(" ")[0]
    const time = calendarInput.current._valueText.split(" ")[1]

  //   // Get the token from local storage using the same key Agatha used to store it in the Login(TeachersPage)

  const teacherAuthToken = JSON.parse(localStorage.getItem("teacherToken"));

    const formData = {
      date: date,
      time: time,
    };

    const config = {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${teacherAuthToken}`,
      },
    };

  //   // Use the saved token in the API request headers
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
        console.log("result:", result);
        setSelectedDate(result.date);
        setSelectedTime(result.time);
      })
      .catch((err) => {
        setErrors(err);
        console.log(err);
      });

  //   // We have to handle the response
  //   // ...
  }

  return (
    
    <Page>
      <THeader />
      <h1 className="page-title">Teacher Dashboard</h1>
      
      <div className="container">
        <aside className="side-menu">
          <div className="profile-card">
            <img
              src="https://via.placeholder.com/80"
              alt="Profile"
              className="profile-img"
            />
            <div className="profile-info">
              <span className="profile-name">John Doe</span>
              <span className="profile-subject">Mathematics</span>
            </div>
          </div>

          <nav className="nav-links">
            <ul className="nav-links">
              <li>
                <a href="/notifications" className="nav-link">
                  <i className="fa fa-bell"></i> Notifications
                </a>
              </li>
              <li>
                <a href="/messages" className="nav-link">
                  <i className="fa fa-envelope"></i> Messages
                </a>
              </li>
              <li>
                <a href="/appointment-history" className="nav-link">
                  <i className="fa fa-calendar-check-o"></i> Appointment History
                </a>
              </li>
              <li>
                <a href="/resources" className="nav-link">
                  <i className="fa fa-book"></i> Resources and Materials
                </a>
              </li>
              <li>
                <a href="/settings" className="nav-link">
                  <i className="fa fa-cog"></i> Settings
                </a>
              </li>
            </ul>
          </nav>
        </aside>
        <section className="upcoming-appointments">
          <h2>Upcoming Appointments</h2>
          {/* List of upcoming appointments */}
        </section>
        <section className="calendar">
          <h2>Select Your Availability</h2>
          <div className="calendar-container">
            <Datepicker
              // onSubmit={submitAvailability}
              controls={["calendar", "timegrid"]}
              ref = {calendarInput}
              dateFormat="DD.MM.YYYY"
              timeFormat="HH:mm"
              // touchUi={true}
              // inputProps={boxInputProps}
              display="inline"
              // inputComponent="input"
              // onSetDate={(event, inst) => {
              //   setSelectedDate(event.valueText.split(" ")[0]);
              //   setSelectedTime(event.valueText.split(" ")[1]);
              // }}
            />
            <button type="submit" className="submit-button" onClick={submitHandler}>
              Submit Availability
            </button>
          </div>
        </section>
      </div>{" "}
      <p> {selectedTime}</p>
      <p>{selectedDate}</p>
    </Page>
  );
}

export default TAvailability;
