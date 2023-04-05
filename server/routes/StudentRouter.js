import express from "express";
import { hash, compare } from "bcrypt";
import createError from "http-errors";
import jwt from "jsonwebtoken";
import Student from "../models/Student.js";
import { registerValidator } from "../middleware/Validators.js";
import { CheckAuthentication } from "../middleware/Authentication.js";

// define student router
const StudentRouter = express.Router();

StudentRouter

  // to get a specific student by id
  .get("/:id", CheckAuthentication, async (req, res, next) => {
    try {
      let findStudent = Student.findOne({ _id: req.params.id });

      //to populate and show appointments
      const query = findStudent;
      // query.populate("appointments", "teacher date time -_id");
      query.populate({
        path: "appointments",
        model: "appointment",
        select: "date time -_id",

        populate: {
          path: "teacher",
          model: "teacher",
          select: "name -_id",
        },
      });

      findStudent = await query.exec();
      res.send(findStudent);
    } catch (error) {
      next(createError(500, error.message));
    }
  })

  // new student registration endpoint
  .post("/register", registerValidator, async (req, res, next) => {
    try {
      // hashing password
      const hashed = await hash(req.body.password, 10);
      // reassigning the password to hashed password
      req.body.password = hashed;
      const newStudent = await Student.create(req.body);
      res.status(201).send(newStudent);
    } catch (error) {
      next(createError(401, error.message));
    }
  })

  // student login by school id
  .post("/login", async (req, res, next) => {
    try {
      // Check if student's id number exists
      const student = await Student.findOne({ schoolId: req.body.schoolId });
      if (!student) {
        next(createError(401, "Student Id or password incorrect"));
        return;
      }
      // Comparing the password
      const successLogin = await compare(req.body.password, student.password);
      if (!successLogin) {
        next(createError(401, "Student Id or password incorrect"));
        return;
      }
      // Token
      // token expiring time, if it expires, log in again
      const option = { expiresIn: "3h" };
      const token = jwt.sign({ id: student._id }, process.env.SECRET, option);
      // send user and token to front end
      res.send({ student, token });
    } catch (error) {
      next(createError(500, error.message));
    }
  });

export default StudentRouter;
