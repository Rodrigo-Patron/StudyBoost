import { Routes, Route } from "react-router-dom";
import "./Main.scss";
import React from "react";
import Home from "../Home/Home";
import TeachersPage from "../TeachersPage/TeachersPage.jsx";
import TAvailability from "../TAvailability/TAvailability.jsx";
import StudentsPage from "../StudentsPage/StudentsPage.jsx";
import SDashboard from "../SDashboard/SDashboard.jsx";

function Main() {
  return (
    <div className="Main">
      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />

        <Route path="/teachersPage">
          <Route index element={<TeachersPage />} />
        </Route>
        <Route path="/availability">
          <Route index element={<TAvailability />} />
        </Route>
        <Route path="/studentsPage">
          <Route index element={<StudentsPage />} />
        </Route>
        <Route path="/appointment">
          <Route index element={<SDashboard />} />
        </Route>
      </Routes>
    </div>
  );
}

export default Main;
