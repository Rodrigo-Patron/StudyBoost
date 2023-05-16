import React, { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import "./TAvailability.scss";
import THeader from "../T-Header/THeader";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const TAvailability = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [availabilities, setAvailabilities] = useState([]);


  useEffect(() => {
    const token = localStorage.getItem("token");
  
    if (!token) {
      console.error("No token found in local storage.");
      return;
    }
  
    const decodedToken = jwt_decode(token);
    const teacherId = decodedToken.userId;
  
    fetch(`/availability/teacher/${teacherId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.data) {
          setAvailabilities(data.data);
        } else {
          console.error("Error fetching availabilities:", data);
        }
      })
      .catch((error) => console.error(error));
  }, []);
  
  console.log("Fetched availabilities:", availabilities);


  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const getAvailabilitiesForDate = () => {
    return availabilities.filter(
      (availability) =>
        new Date(availability.date).toDateString() ===
        selectedDate.toDateString()
    );
  };

  const renderTimeSlots = () => {
    const timeSlots = getAvailabilitiesForDate()[0]?.time;

    if (timeSlots) {
      return timeSlots.map((time, index) => <div key={index}>{time}</div>);
    } else {
      return <div>No availabilities for this date</div>;
    }
  };

  const renderTileContent = ({ date, view }) => {
    if (view !== "month") return null;
  
    const availability = availabilities.find(
      (avail) =>
        new Date(avail.date).toDateString() === date.toDateString()
    );
  
    if (availability) {
      return (
        <div>
          <span className="availability-indicator"></span>
        </div>
      );
    }
  
    return null;
  };
  

  return (
    <div>
     <THeader/>
      <div className="t-availability-container"> {/* add a container div */}
        <h1>Your Availability</h1>
        
        <div className="calendar-container"> {/* wrap the Calendar component inside a div */}
        
        <Calendar
  value={selectedDate}
  onClickDay={handleDateChange}
  tileContent={renderTileContent}
/>

        </div>
        <div>{renderTimeSlots()}</div>
      </div>
    </div>
  );
};

export default TAvailability;
