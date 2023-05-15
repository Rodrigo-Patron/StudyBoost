import { createTransport } from "nodemailer";
import createError from "http-errors";
import express from "express";

const sendEmail = async (req, res, next) => {
  try {
    let transporter = createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: "agatha@aims.ac.tz", // generated ethereal user
        pass: "vwaecutlkjirtkzj", // generated ethereal password
      },
    });
    await transporter.sendMail({
      from: "agatha@aims.ac.tz",
      to: "agatha@aims.ac.tz",
      subject: "Booking Notification",
      text: "You have booked the appointment",
    });
    next();
  } catch (error) {
    console.log(error.message);
  }
};

export default sendEmail;
