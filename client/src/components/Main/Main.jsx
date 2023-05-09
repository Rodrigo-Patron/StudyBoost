import { Routes, Route } from "react-router-dom";
import "./Main.scss";
import React from "react";
import Home from "../Home/Home";
import TeachersPage from "../TeachersPage/TeachersPage.jsx";
import TDashboard from "../TDashboard/TDashboard.jsx";
import StudentsPage from "../StudentsPage/StudentsPage.jsx";
import SDashboard from "../SDashboard/SDashboard.jsx";
import About from "../About/About";
import Availabilities from "../Availabilities/Availabilities";
import SAppointment from "../SAppointment/SAppointment";
import TAppointments from "../TAppointments/TAppointments";


function Main() {
  return (
    <div className="Main">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="home" element={<Home />} />
        <Route path="about">
          <Route index element={<About />} />
        </Route>
        <Route path="/teachersPage">
          <Route index element={<TeachersPage />} />
        </Route>
        <Route path="teacherDashboard">
          <Route index element={<TDashboard />} />

          <Route path="teacherAppointments" element={<TAppointments />} />
        </Route>
        <Route path="studentsPage">
          <Route index element={<StudentsPage />} />
        </Route>
        <Route path="studentDashboard">
          <Route index element={<SDashboard />} />{" "}
          <Route path=":teacherId" element={<Availabilities />} />{" "}
          <Route path="studentAppointments" element={<SAppointment />} />
        </Route>
      </Routes>
    </div>
  );
}

export default Main;
