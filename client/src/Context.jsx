import { createContext, useState } from "react";

export const Context = createContext(null);

const defaultTeacherToken =
  JSON.parse(localStorage.getItem("teacherToken")) || null;
const defaultTeacher = JSON.parse(localStorage.getItem("teacher")) || null;
const defaultStudentToken =
  JSON.parse(localStorage.getItem("studentToken")) || null;
const defaultStudent = JSON.parse(localStorage.getItem("student")) || null;
function ContextProvider({ children }) {
  const [teacher, setTeacher] = useState(defaultTeacher);
  const [student, setStudent] = useState(defaultStudent);
  const [errors, setErrors] = useState(null);
  const [teacherToken, setTeacherToken] = useState(defaultTeacherToken);
  const [studentToken, setStudentToken] = useState(defaultStudentToken);
  const [deleteAppointment, setDeleteAppointment] = useState(false);
  const [show, setShow] = useState(true);

  return (
    <Context.Provider
      value={{
        teacher,
        setTeacher,
        student,
        setStudent,
        errors,
        setErrors,
        teacherToken,
        setTeacherToken,
        studentToken,
        setStudentToken,
        deleteAppointment,
        setDeleteAppointment,
        show,
        setShow,
      }}
    >
      {children}
    </Context.Provider>
  );
}

export default ContextProvider;
