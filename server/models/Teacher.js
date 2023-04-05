import mongoose from "mongoose";

const { Schema, model } = mongoose;

// Teacher Schema
const teacherSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, unique: true },
    password: { type: String, required: true },
    schoolId: { type: Number, required: true, trim: true, unique: true },
    role: { type: String, default: "teacher" },
    subjects: [{ type: String, required: true }],
    availabilityByTeacher: [
      {
        type: Schema.Types.ObjectId,
        ref: "availability",
      },
    ],
    appointmentsByStudents: [
      { type: Schema.Types.ObjectId, ref: "appointment" },
    ],
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
