import express from "express";
import dotenv from "dotenv";
// import logger from "morgan";
// import cors from "cors";
import createError from "http-errors";
import connectDB from "./lib/db.js";
import StudentRouter from "./routes/StudentRouter.js";
import TeacherRouter from "./routes/TeacherRouter.js";
import { CheckAuthentication } from "./middleware/Authentication.js";
import AvailabilityRouter from "./routes/AvailabilityRouter.js";
import AppointmentRouter from "./routes/AppointmentRouter.js";

// Defining server
const server = express();

// Making env readable
dotenv.config();

// Defining the port
const port = process.env.PORT || 6500;

//Connecting to DB
connectDB();

// Middleware
server.use(express.json());
// server.use(logger("dev"));
server.use(express.urlencoded({ extended: false }));
// REMOVE BEFORE DEPLOY!!
// server.use(cors());

//DEPLOYMENT - to make public folder accessible for browsers
server.use(express.static(process.argv[1] + "/public"));

// Routes
server.use("/api/students", StudentRouter);
server.use("/api/teachers", TeacherRouter);
server.use("/api/availability", CheckAuthentication, AvailabilityRouter);
server.use("/api/appointments", CheckAuthentication, AppointmentRouter);

// Page not found middleware
server.use("*", (req, res, next) => {
  next(createError(404, "Page not found"));
});

// Global error handler
server.use((err, req, res, next) => {
  res
    .status(err.status || 500)
    .send({ message: err.message || "Sorry, something went wrong" });
});

//DEPLOYMENT - make response for any GET method to index.html(react)
server.get("*", (req, res) => {
  res.sendFile(`${process.argv[1]}/public/index.html`);
});

// Starting the server
server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
