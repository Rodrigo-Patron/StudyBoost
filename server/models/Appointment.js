import mongoose from "mongoose";

const { Schema, model } = mongoose;

// Appointment Schema
const appointmentSchema = new Schema(
  {
    student: { type: Schema.Types.ObjectId, ref: "student" },
    teacher: { type: Schema.Types.ObjectId, ref: "teacher" },
    date: { type: String, required: true },
    time: { type: String, required: true, unique: true },
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
