import express from "express";
import createError from "http-errors";
import Availability from "../models/Availability.js";
import Teacher from "../models/Teacher.js";
import Student from "../models/Student.js";
import Appointment from "../models/Appointment.js";

//define appointment router
const AppointmentRouter = express.Router();

AppointmentRouter

  //get appointments of a specific student
  .get("/:studentId", async (req, res, next) => {
    try {
      let findAppointment = Appointment.find({
        student: req.params.studentId,
      }).sort({ dateInMil: 1, time: 1 });

      //to populate and show appointments
      const query = findAppointment;
      query.populate("teacher", "name -_id");
      query.populate("student", "name -_id");
      findAppointment = await query.exec();

      // delete all past appointments

      (await findAppointment).map(async (ap) => {
        let yearFromDB = ap.date.split("/")[ap.date.split("/").length - 1];
        let dayFromDB = ap.date.split("/")[1];
        let monthFromDB = ap.date.split("/")[0];
        let dateFromDb = new Date(
          `${monthFromDB}/${dayFromDB}/${yearFromDB} :${ap.time
            .split("-")[0]
            .trim()}`
        );
        try {
          let currentDate = new Date();
          // console.log(dateFromDb < currentDate);
          if (dateFromDb < currentDate) {
            //to delete the appointment from the student collection
            const student = await Student.findOne({
              _id: req.params.studentId,
            });
            // console.log("Student", student);
            student.appointments = student.appointments.filter(
              (x) => x.toString() !== ap._id.toString()
            );
            await student.save();

            //to delete the appointment from the teacher collection finding by name of teacher
            const teacher = await Teacher.findOne(ap.teacher);
            // console.log(teacher);
            // console.log(ap.teacher);
            teacher.appointmentsByStudents =
              teacher.appointmentsByStudents.filter(
                (x) => x.toString() !== ap._id.toString()
              );

            await teacher.save();

            // delete appointment from database
            await Appointment.findByIdAndDelete(ap._id);
          }
        } catch (error) {
          next(createError(500, error.message));
        }
      });

      res.send(findAppointment);
    } catch (error) {
      next(createError(500, error.message));
    }
  })

  // get appointments of a specific teacher
  .get("/teacher/:teacherId", async (req, res, next) => {
    try {
      let findAppointment = Appointment.find({
        teacher: req.params.teacherId,
      }).sort({ dateInMil: 1, time: 1 });

      //to populate and show appointments
      const query = findAppointment;
      query.populate("teacher", "name -_id");
      query.populate("student", "name -_id");
      findAppointment = await query.exec();

      // delete all past appointments

      (await findAppointment).map(async (ap) => {
        let yearFromDB = ap.date.split("/")[ap.date.split("/").length - 1];
        let dayFromDB = ap.date.split("/")[1];
        let monthFromDB = ap.date.split("/")[0];
        let dateFromDb = new Date(
          `${monthFromDB}/${dayFromDB}/${yearFromDB} :${ap.time
            .split("-")[0]
            .trim()}`
        );
        try {
          let currentDate = new Date();
          // console.log(dateFromDb < currentDate);
          if (dateFromDb < currentDate) {
            // to delete the appointment from the student collection
            const student = await Student.findOne(ap.student);
            // console.log("Student", student);
            student.appointments = student.appointments.filter(
              (x) => x.toString() !== ap._id.toString()
            );
            await student.save();

            //to delete the appointment from the teacher collection
            const teacher = await Teacher.findOne({
              _id: req.params.teacherId,
            });
            teacher.appointmentsByStudents =
              teacher.appointmentsByStudents.filter(
                (x) => x.toString() !== ap._id.toString()
              );
            await teacher.save();

            // delete appointment from database
            await Appointment.findByIdAndDelete(ap._id);
          }
        } catch (error) {
          next(createError(500, error.message));
        }
      });

      res.send(findAppointment);
    } catch (error) {
      next(createError(500, error.message));
    }
  })

  // creating appointment by student
  .post("/", async (req, res, next) => {
    try {
      req.body.student = req.userId;

      // find the teacher
      const findTeacher = await Availability.find({
        time: { $elemMatch: { $eq: req.body.time } },
        teacher: req.body.teacher,
        date: req.body.date,
      });

      // console.log("findTeacher", findTeacher);

      if (!findTeacher) {
        return next(
          createError(
            400,
            "Appointment failed, please check availability and try again"
          )
        );
      }

      // to check if appointment already exists
      const existingAppointment = await Appointment.findOne({
        student: req.userId,
        time: req.body.time,
        date: req.body.date,
      });
      if (existingAppointment) {
        return next(
          createError(
            400,
            "Appointment failed, please check availability and try again"
          )
        );
      }
      const newAppointment = await Appointment.create(req.body);

      // to relate the appointment to the teacher
      const teacher = await Teacher.findById(req.body.teacher);
      teacher.appointmentsByStudents.push(newAppointment._id);
      teacher.save();

      //to relate the appointment to the student
      const student = await Student.findById(req.userId);
      student.appointments.push(newAppointment._id);
      student.save();

      res.status(200).send(newAppointment);

      // to delete the selected time (appointment made) in the db
      if (newAppointment) {
        const removeAvailability = await Availability.findOne({
          time: { $elemMatch: { $eq: req.body.time } },
          teacher: req.body.teacher,
          date: req.body.date,
        });

        const filterTime = removeAvailability.time.filter(
          (x) => x !== newAppointment.time
        );
        const updateAvailability = {
          teacher: req.body.teacher,
          date: req.body.date,
          time: filterTime,
        };

        await Availability.findByIdAndUpdate(
          { _id: removeAvailability._id },
          updateAvailability,
          { new: true }
        );
      }

      //to delete availability once is empty/ no more that day
      const findAvailability = await Availability.findOneAndDelete({
        time: [],
      });
      // console.log(findAvailability);

      const deleteAv = await Teacher.findById(findAvailability.teacher);
      console.log(deleteAv);

      deleteAv.availabilityByTeacher = deleteAv.availabilityByTeacher.filter(
        (x) => x.toString() !== findAvailability._id.toString()
      );
      await deleteAv.save();
    } catch (error) {
      next(createError(400, error.message));
    }
  })

  // to delete an appointment
  .delete("/:id", async (req, res, next) => {
    try {
      const deletedOne = await Appointment.deleteOne({ _id: req.params.id });

      if (deletedOne.deletedCount) {
        res.status(200).send({ message: "Appointment has been deleted" });
        return;
      }
      next({ status: 404, message: "Appointment not found" });
    } catch (error) {
      next(createError(500, error.message));
    }
  });

export default AppointmentRouter;
