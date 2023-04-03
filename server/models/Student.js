import mongoose from "mongoose";

const { Schema, model } = mongoose;

// Student Schema
const studentSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, unique: true },
    password: { type: String, required: true },
    schoolId: { type: Number, required: true, trim: true, unique: true },
    role: { type: String, default: "student" },
    appointments: [{ type: Schema.Types.ObjectId, ref: "appointment" }],
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

// Student Model
const Student = model("student", studentSchema);

export default Student;
