import mongoose from "mongoose";

const { Schema, model } = mongoose;

// Teacher Schema
const teacherSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, unique: true },
    password: { type: String, required: true },
    schoolID: { type: Number, required: true, trim: true, unique: true },
    appointments: [{ type: Schema.Types.ObjectId, ref: "appointment" }],
    subject: [{ type: String, required: true, unique: true }],
    availability: [
      {
        day: { type: String },
        start: { type: String },
        end: { type: String },
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
