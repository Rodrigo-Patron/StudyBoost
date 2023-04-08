import mongoose from "mongoose";

const { Schema, model } = mongoose;

// Student Schema
const studentSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, unique: true },
    password: { type: String, required: true },
    schoolId: { type: Number, required: true, trim: true, unique: true },
    role: { type: String, default: "Student" },
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

// capitalize first letter
studentSchema.pre("save", function (next) {
  const words = this.name.split(" ");
  this.name = words
    .map((x) => x.charAt(0).toUpperCase() + x.slice(1).toLowerCase())
    .join(" ");
  next();
});

//email to lowercase
studentSchema.pre("save", function (next) {
  this.email = this.email.toLowerCase();
  next();
});

// Student Model
const Student = model("student", studentSchema);

export default Student;
