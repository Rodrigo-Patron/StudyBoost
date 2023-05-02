import express from "express";
import createError from "http-errors";
import Availability from "../models/Availability.js";
import Teacher from "../models/Teacher.js";

// define availability router
const AvailabilityRouter = express.Router();

AvailabilityRouter

  // get availability of a specific teacher
  .get("/:teacherId", async (req, res, next) => {
    try {
      let findAvailability = Availability.find({
        teacher: req.params.teacherId,
      }).sort({ date: 1, time: 1 });

      //to populate and show availability
      const query = findAvailability;
      query.populate("teacher", "name -_id");
      findAvailability = await query.exec();

      // delete all past times
      (await findAvailability).map((av) => {
        // let currentDate = new Date();
        // let currentYear = currentDate.getFullYear();
        // let currentDay = currentDate.getDay();
        // let currentMonth = currentDate.getMonth() + 1;
        // let currentHour = currentDate.getHours();
        // let currentMinutes = currentDate.getMinutes();

        let yearFromDB = av.date.split("/")[av.date.split("/").length - 1];
        let dayFromDB = av.date.split("/")[1];
        let monthFromDB = av.date.split("/")[0];
        av.time.forEach((t) => {
          let dateFromDb = new Date(
            `${monthFromDB}/${dayFromDB}/${yearFromDB} :${t
              .split("-")[0]
              .trim()}`
          );
          let currentDate = new Date();
          console.log(dateFromDb < currentDate);
          if (dateFromDb < currentDate) {
            // delete time from database
            Availability.findByIdAndUpdate(
              av._id,
              {
                $pull: { time: t },
              },
              { new: true }
            ).then((dr) => {
              console.log(dr);
            });
          }
        });
      });
      ///////////////

      //to delete availability once is empty/ no more that day
      const findAv = await Availability.findOneAndDelete({
        time: [],
      });
      // console.log(findAvailability);
      if (findAv) {
        const deleteAv = await Teacher.findById(findAv.teacher);
        // console.log(deleteAv);

        deleteAv.availabilityByTeacher = deleteAv.availabilityByTeacher.filter(
          (x) => x.toString() !== findAv._id.toString()
        );
        await deleteAv.save();
      }
      let findAvailability1 = await Availability.find({
        teacher: req.params.teacherId,
      }).sort({ date: 1, time: 1 });
      res.send(findAvailability1);
    } catch (error) {
      next(createError(500, error.message));
    }
  })

  // creating availability by teacher
  .post("/", async (req, res, next) => {
    try {
      req.body.teacher = req.userId;

      // Check for existing availability with the same date, time, and teacher
      const existingAvailability = await Availability.findOne({
        teacher: req.userId,
        date: req.body.date,
        time: req.body.time,
      });

      // If an existing availability is found, return an error message
      if (existingAvailability) {
        return next(
          createError(
            400,
            "You have already set an availability for this date and time."
          )
        );
      }

      const newAvailability = await Availability.create(req.body);
      // after creating the availabilities, teacher is added
      const teacher = await Teacher.findById(req.body.teacher);
      // const teacher = await Teacher.find({
      //   _id: req.body.teacher,
      //   // date: req.body.date,
      // });
      console.log(req.body);
      teacher.availabilityByTeacher.push(newAvailability._id);
      teacher.save();

      res.status(200).send(newAvailability);
      // res.status(200).json(req.body);
    } catch (error) {
      next(createError(400, error.message));
    }
  })

  // to delete availability
  .delete("/:id", async (req, res, next) => {
    try {
      const deletedOne = await Availability.deleteOne({ _id: req.params.id });

      if (deletedOne.deletedCount) {
        res.status(200).send({ message: "Availability has been deleted" });
        return;
      }
      next({ status: 404, message: "Availability not found" });
    } catch (error) {
      next(createError(500, error.message));
    }
  });

export default AvailabilityRouter;
