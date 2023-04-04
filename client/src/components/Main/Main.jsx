import { Routes, Route } from "react-router-dom";
import Home from "../Home/Home";
import TeachersPage from "../TeachersPage/TeachersPage.jsx";
import TAvailability from "../TAvailability/TAvailability.jsx";

import "./Main.scss";

import React from "react";

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
      </Routes>
    </div>
  );
}

export default Main;
