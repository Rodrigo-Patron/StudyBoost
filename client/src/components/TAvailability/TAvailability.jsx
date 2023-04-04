import React, { useState } from "react";
import "./TAvailability.scss";
import "@mobiscroll/react/dist/css/mobiscroll.min.css";
import {
  Datepicker,
  Page,
  setOptions,
  localeDe,
} from "@mobiscroll/react";
import "font-awesome/css/font-awesome.min.css";

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

  async function submitAvailability() {
    // Get the token from local storage using the same key Agatha used to store it in the Login(TeachersPage)
    const teacherAuthToken = localStorage.getItem("teacherToken");

    // Use the saved token in the API request headers
    const response = await fetch("http://localhost:6500/api/availability", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${teacherAuthToken}`,
      },
      body: JSON.stringify({
        date: selectedDate,
        time: [selectedTime], 
      }),
    });

    // We have to handle the response 
    // ...
  }

  return (
    <Page>
      <h1 className="page-title">Teacher Dashboard</h1>
      <div className="container">
        <aside className="side-menu">
        <div className="profile-card">
        <img src="https://via.placeholder.com/80" alt="Profile" className="profile-img" />
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
          controls={["calendar", "timegrid"]}
          touchUi={true}
          inputProps={boxInputProps}
          display="inline"
          onSetDate={(event, inst) => setSelectedTime(event.valueText)}
          />
          <button className="submit-button" onClick={submitAvailability}>Submit Availability</button>
         </div>
    </section>
    </div>
   </Page>
);
}

export default TAvailability

