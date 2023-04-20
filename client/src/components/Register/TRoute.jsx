import React from "react";
import { Routes, Route } from "react-router-dom";
import TRegister from "./TRegister";

function TRoute() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<TRegister />} />
      </Routes>
    </div>
  );
}

export default TRoute;
