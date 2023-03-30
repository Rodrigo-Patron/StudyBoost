import express from "express";
import createError from "http-errors";
import Appointment from "../models/Appointment.js";
import Student from "../models/Student.js";
import Teacher from "../models/Teacher.js";

// define appointment router
const AppointmentRouter = express.Router();

// //availability by teacher
// AppointmentRouter.post("/:teacherId", async (req, res, next) => {
//   req.body.teacherID = req.userId;

//   try {
//     const teacher = await Teacher.findById(req.body.teacherID);

//     if (!teacher) {
//       return next(createError(404, "Teacher not found"));
//     }
//     const newAvailability = new Question(req.body);
//     await newQuestion.save();

//     author.questions.push(newQuestion);
//     await author.save();

//     res.status(201).send({ newData: newQuestion });
//   } catch (error) {
//     next(createError(401, error.message));
//   }
// });

AppointmentRouter.post("/:studentId", async (req, res, next) => {
  req.body.studentID = req.userId;

  try {
    const student = await Student.findById(req.body.studentID);

    if (!student) {
      return next(createError(404, "Student not found"));
    }
    const newAppointment = new Appointment(req.body);
    await newAppointment.save();

    student.appointments.push(newAppointment);
    await student.save();

    res.status(201).send({ newData: newAppointment });
  } catch (error) {
    next(createError(401, error.message));
  }
});

export default AppointmentRouter;
