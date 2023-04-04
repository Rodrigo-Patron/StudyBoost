import mongoose from "mongoose";
import Teacher from "./Teacher.js";
import Student from "./Student.js";

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

// this refers to the appointment to be deleted
// this.getQuery() gives us the id of the appointment deleted
appointmentSchema.pre("deleteOne", async function () {
  // console.log(this.getQuery());
  const id = this.getQuery()._id;

  //to delete the appointment from the teacher collection
  const teacher = await Teacher.findOne({ appointmentsByStudents: id });

  teacher.appointmentsByStudents = teacher.appointmentsByStudents.filter(
    (x) => x.toString() !== id.toString()
  );

  await teacher.save();

  //to delete the appointment from the student collection
  const student = await Student.findOne({ appointments: id });

  student.appointments = student.appointments.filter(
    (x) => x.toString() !== id.toString()
  );

  await student.save();
});

// Appointment Model
const Appointment = model("appointment", appointmentSchema);

export default Appointment;
