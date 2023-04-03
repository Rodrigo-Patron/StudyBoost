import express from "express";
import { hash, compare } from "bcrypt";
import createError from "http-errors";
import jwt from "jsonwebtoken";
import Teacher from "../models/Teacher.js";
import { registerValidator } from "../middleware/Validators.js";

// define teacher router
const TeacherRouter = express.Router();

TeacherRouter

  //to get a specific teacher by id
  .get("/:id", async (req, res, next) => {
    try {
      let findTeacher = Teacher.findOne({ _id: req.params.id });

      //to populate and show availability
      const query = findTeacher;

      query.populate("availabilityByTeacher", "date time -_id");
      //to populate and show appointments
      // query.populate("appointmentsByStudents", "student date time -_id");

      query.populate({
        path: "appointmentsByStudents",
        model: "appointment",
        select: "date time -_id",

        populate: {
          path: "student",
          model: "student",
          select: "name -_id",
        },
      });

      findTeacher = await query.exec();
      res.send(findTeacher);
    } catch (error) {
      next(createError(500, error.message));
    }
  })

  // new teacher registration endpoint
  .post("/register", registerValidator, async (req, res, next) => {
    try {
      // hashing password
      const hashed = await hash(req.body.password, 10);
      // reassigning the password to hashed password
      req.body.password = hashed;
      const newTeacher = await Teacher.create(req.body);
      res.status(201).send(newTeacher);
    } catch (error) {
      next(createError(401, error.message));
    }
  })

  // teacher login by school id
  .post("/login", async (req, res, next) => {
    try {
      // Check if teacher's id number exists
      const teacher = await Teacher.findOne({ schoolId: req.body.schoolId });
      if (!teacher) {
        next(createError(401, "Teacher Id or password incorrect"));
        return;
      }
      // Comparing the password
      const successLogin = await compare(req.body.password, teacher.password);
      if (!successLogin) {
        next(createError(401, "Teacher Id or password incorrect"));
        return;
      }
      // Token
      // token expiring time, if it expires, log in again
      const option = { expiresIn: "3h" };
      const token = jwt.sign({ id: teacher._id }, process.env.SECRET, option);
      // send user and token to front end
      res.send({ teacher, token });
    } catch (error) {
      next(createError(500, error.message));
    }
  });

export default TeacherRouter;
