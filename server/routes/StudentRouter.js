import express from "express";
import { hash, compare } from "bcrypt";
import createError from "http-errors";
import jwt from "jsonwebtoken";
import Student from "../models/Student.js";
import { registerValidator } from "../middleware/Validators.js";

// define student router
const StudentRouter = express.Router();
// new student registration endpoint
StudentRouter.post("/register", registerValidator, async (req, res, next) => {
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
      const student = await Student.findOne({ schoolID: req.body.schoolID });
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
      const option = { expiresIn: "120min" };
      const token = jwt.sign({ id: student._id }, process.env.SECRET, option);
      // send user and token to front end
      res.send({ student, token });
    } catch (error) {
      next(createError(500, error.message));
    }
  });

export default StudentRouter;
