import React, { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import "./TAvailability.scss";
import THeader from "../T-Header/THeader";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const TAvailability = () => {
//   const [selectedDate, setSelectedDate] = useState(new Date());
//   const [availability, setAvailability] = useState([]);

//   useEffect(() => {
//     const token = JSON.parse(localStorage.getItem("teacherToken"));
//     const decoded = jwt_decode(token);

//     fetch(`http://localhost:6500/api/availability/${decoded._id}`, {
//       method: "GET",
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     })
//       .then((res) => res.json())
//       .then((data) => setAvailability(data))
//       .catch((err) => console.error(err));
//   }, []);

//   const handleDateChange = (date) => {
//     setSelectedDate(date);
//   };

//   const renderTileContent = ({ date, view }) => {
//     if (view !== "month") return null;

//     const dateString = date.toLocaleDateString(navigator.language);
//     const availableDate = availability.find(
//       (av) => av.date === dateString
//     );

//     if (availableDate) {
//       return <div className="availability-indicator"></div>;
//     }
//     return null;
//   };

//   const renderTimeSlots = () => {
//     const dateString = selectedDate.toLocaleDateString(navigator.language);
//     const availableDate = availability.find(
//       (av) => av.date === dateString
//     );

//     if (availableDate) {
//       return availableDate.time.map((time, index) => (
//         <p key={index}>{time}</p>
//       ));
//     } else {
//       return <p>No availability on this date</p>;
//     }
//   };

  return (
    <div>
      <THeader />
      <div className="t-availability-container">
        <h1>Your Availability</h1>

        {/* <div className="calendar-container"> */}
          {/* <Calendar
            // value={selectedDate}
            // onClickDay={handleDateChange}
            // tileContent={renderTileContent}
        //   />
        // </div>
        // <div>{renderTimeSlots()}</div> */}
      </div>
    </div>
  );
};

export default TAvailability;
