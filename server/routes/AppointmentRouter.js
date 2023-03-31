import express from "express";
import createError from "http-errors";
import Appointment from "../models/Appointment.js";
import Student from "../models/Student.js";
import Teacher from "../models/Teacher.js";

// define appointment router
const AppointmentRouter = express.Router();

AppointmentRouter.post("/:teacherId", async (req, res, next) => {
  try {
    req.body.author = req.userId;
    const newAvailability = await Appointment.create(req.body);
    //^ after creating an appointment, author who is the teacher is added
    const teacher = await Teacher.findById(req.body.author);
    teacher.availabilityByTeacher.push(newAvailability._id);
    teacher.save();

    res.status(200).send(newAvailability);
  } catch (error) {
    next(createError(400, error.message));
  }
})
  //^ get all availability of teacher
  .get("/allAvailability", async (req, res, next) => {
    try {
      const teachersAvailability = Appointment.find({});
      //^ get the content instead of an id, exec means execute
      teachersAvailability.populate("author", "name -_id");
      const allTimeSlot = await teachersAvailability.exec();
      res.send(allTimeSlot);
    } catch (error) {
      next(createError(500, error.message));
    }
  });

export default AppointmentRouter;
