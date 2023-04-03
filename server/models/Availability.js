import mongoose from "mongoose";

const { Schema, model } = mongoose;

// Availability Schema
const availabilitySchema = new Schema(
  {
    teacher: { type: Schema.Types.ObjectId, ref: "teacher" },
    date: { type: String },
    time: [{ type: String }],
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

// Availability Model
const Availability = model("availability", availabilitySchema);

export default Availability;
