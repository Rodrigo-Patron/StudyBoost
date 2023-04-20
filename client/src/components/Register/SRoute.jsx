import React from "react";
import { Routes, Route } from "react-router-dom";
import SRegister from "./SRegister";

function SRoute() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<SRegister />} />
      </Routes>
    </div>
  );
}

export default SRoute;
