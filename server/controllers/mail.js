import { db } from "../db.js";
import nodemailer from "nodemailer";
export const sendRacun = (req, res) => {
  const transporter = nodemailer.createTransport({
    port: 465, // true for 465, false for other ports
    host: "smtp.gmail.com",
    auth: {
      user: "zeljkotrifunovic9@gmail.com",
      pass: "",
    },
    secure: true,
  });
  const mailData = {
    from: "zeljkotrifunovic9@gmail.com", // sender address
    to: "myfriend@gmail.com", // list of receivers
    subject: "Sending Email using Node.js",
    text: "That was easy!",
    html: "<b>Hey there! </b><br> This is our first message sent with Nodemailer<br/>",
  };
  transporter.sendMail(mailData, function (err, info) {
    if (err) console.log(err);
    else console.log(info);
  });
};
