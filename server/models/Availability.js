import mongoose from "mongoose";
import Teacher from "./Teacher.js";

const { Schema, model } = mongoose;

// Time Slot Schema
const timeSlotSchema = new Schema(
  {
    time: { type: String },
  },
  { timestamps: false, _id: true }
);

// Availability Schema
const availabilitySchema = new Schema(
  {
    teacher: { type: Schema.Types.ObjectId, ref: "teacher" },
    date: { type: String },
    time: [{ type: String }],
    dateInMil: { type: Number },
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
availabilitySchema.post("deleteOne", async function () {
  // console.log(this.getQuery());
  const id = this.getQuery()._id;

  //to delete the availability from the teacher collection
  const teacher = await Teacher.findOne({ availabilityByTeacher: id });

  teacher.availabilityByTeacher = teacher.availabilityByTeacher.filter(
    (x) => x.toString() !== id.toString()
  );

  await teacher.save();
});

// Availability Model
const Availability = model("availability", availabilitySchema);

export default Availability;
