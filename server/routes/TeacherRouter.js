import express from "express";
import { hash, compare } from "bcrypt";
import createError from "http-errors";
import jwt from "jsonwebtoken";
import Teacher from "../models/Teacher.js";
import { registerValidator } from "../middleware/Validators.js";

// define teacher router
const TeacherRouter = express.Router();
// new teacher registration endpoint
TeacherRouter.post("/register", registerValidator, async (req, res, next) => {
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
      const teacher = await Teacher.findOne({ schoolID: req.body.schoolID });
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
      const option = { expiresIn: "120min" };
      const token = jwt.sign({ id: teacher._id }, process.env.SECRET, option);
      // send user and token to front end
      res.send({ teacher, token });
    } catch (error) {
      next(createError(500, error.message));
    }
  });

export default TeacherRouter;
