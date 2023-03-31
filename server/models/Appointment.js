import { timeStamp } from "console";
import mongoose from "mongoose";

const { Schema, model } = mongoose;

// Appointment Schema
const appointmentSchema = new Schema(
  {
    teacherID: { type: Schema.Types.ObjectId, ref: "teacher" },
    date: [String],
    time: [String],
    role: {
      type: String,
      enum: ["teacher"],
      default: "teacher",
    },
    author: { type: Schema.Types.ObjectId, ref: "teacher" },
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
