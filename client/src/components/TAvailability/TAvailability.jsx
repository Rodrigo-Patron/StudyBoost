import React, { useState } from "react";
import "./TAvailability.scss";
import "@mobiscroll/react/dist/css/mobiscroll.min.css";
import { Datepicker, Page, setOptions, localeDe } from "@mobiscroll/react";
import "font-awesome/css/font-awesome.min.css";
import { useContext, useRef } from "react";
import { Context } from "../../Context.jsx";
import THeader from "../T-Header/THeader";

setOptions({
  locale: localeDe,
  theme: "ios",
  themeVariant: "light",
});

function TAvailability({ menuCollapse }) {
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

  const calendarInput = useRef();

  function submitHandler() {
    const date = calendarInput.current._valueText.split(" ")[0];
    const time = calendarInput.current._valueText.split(" ")[1];

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
        console.log("result:", result);
        setSelectedDate(result.date);
        setSelectedTime(result.time);
      })
      .catch((err) => {
        setErrors(err);
        console.log(err);
      });
  }

  return (
    <>
      <THeader />
      <Page>
        <h1 className="page-title">Teacher Dashboard</h1>

        <div
          className="container"
          style={{
            marginLeft: menuCollapse ? "80px" : "300px",
            transition: "margin-left 0.3s",
          }}
        >
          <section className="upcoming-appointments">
            <h2>Upcoming Appointments</h2>
          </section>
          <section className="calendar">
            <h2>Select Your Availability</h2>
            <div className="calendar-container">
              <Datepicker
                controls={["calendar", "timegrid"]}
                ref={calendarInput}
                dateFormat="DD.MM.YYYY"
                timeFormat="HH:mm"
                display="inline"
              />
              <button
                type="submit"
                className="submit-button"
                onClick={submitHandler}
              >
                Submit Availability
              </button>
            </div>
          </section>
        </div>{" "}
        <p> {selectedTime}</p>
        <p>{selectedDate}</p>
      </Page>
    </>
  );
}

export default TAvailability;