import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../../Context.jsx";
import "./Logout.scss";

function Logout() {
  const navigate = useNavigate();
  const { setTeacher, setStudent, setStudentToken, setTeacherToken } =
    useContext(Context);

  function logoutHandler() {
    localStorage.removeItem("teacherToken");
    localStorage.removeItem("teacher");
    localStorage.removeItem("studentToken");
    localStorage.removeItem("student");
    navigate("/Home");

    setTeacher(null);
    setTeacherToken(null);
    setStudent(null);
    setStudentToken(null);
  }
  return (
    <div className="Logout">
      <Button className="logout-btn" onClick={logoutHandler}>
        Logout
      </Button>
    </div>
  );
}

export default Logout;
