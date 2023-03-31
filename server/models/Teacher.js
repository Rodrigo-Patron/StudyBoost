import mongoose from "mongoose";

const { Schema, model } = mongoose;

// Teacher Schema
const teacherSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, unique: true },
    password: { type: String, required: true },
    schoolID: { type: Number, required: true, trim: true, unique: true },
    appointmentsByStudents: [{ type: Schema.Types.ObjectId, ref: "student" }],
    subject: [{ type: String, required: true, unique: true }],
    availabilityByTeacher: [
      {
        type: Schema.Types.ObjectId,
        ref: "appointment",
      },
    ],
    role: { type: String, default: "teacher" },
  },
  {
    toJSON: {
      transform: function (doc, userObj) {
        delete userObj.password;
        delete userObj.__v;
        return userObj;
      },
    },
  }
);

// Teacher Model
const Teacher = model("teacher", teacherSchema);

export default Teacher;
