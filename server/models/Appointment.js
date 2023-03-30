import { timeStamp } from "console";
import mongoose from "mongoose";

const { Schema, model } = mongoose;

// Appointment Schema
const appointmentSchema = new Schema(
  {
    studentID: { type: Schema.Types.ObjectId, ref: "student" },
    teacherID: { type: Schema.Types.ObjectId, ref: "teacher" },
    start: { type: String },
    end: { type: String },
    status: { type: String },
  },
  {
    toJSON: {
      transform: function (doc, userObj) {
        delete userObj.__v;
        return userObj;
      },
    },
  }
);

// Appointment Model
const Appointment = model("appointment", appointmentSchema);

export default Appointment;
