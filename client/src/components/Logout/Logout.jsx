import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./Logout.scss";

function Logout() {
  const navigate = useNavigate();

  function logoutHandler() {
    localStorage.removeItem("teacherToken");
    localStorage.removeItem("studentToken");
    navigate("/Home");
  }

  return (
    <div className="Logout">
      <Button className="logout-btn" onClick={logoutHandler}>
        Log out
      </Button>
    </div>
  );
}

export default Logout;
