import { db } from "../db.js";
import nodemailer from "nodemailer";
export const sendRacun = (req, res) => {
  const transporter = nodemailer.createTransport({
    pool: true,
    port: 465, // true for 465, false for other ports
    host: "smtp.gmail.com",
    auth: {
      user: "batazivojin2@gmail.com",
      pass: "aznaznilzbnkcbsk",
    },
    secure: true,
  });
  let message =
    '<table style="border: 1px solid #333;">' +
    "<tr>" +
    "<th>Naziv aktivnosti ili broj sobe</th>" +
    "<th> fte </th>" +
    "</tr>";
  const mailData = {
    from: "batazivojin2@gmail.com", // sender address
    to: req.body.to, // list of receivers
    subject: "Racun iz Hotela",
    text: "That was easy!",
    html:
      "<b>Uprilogu se nalazi racun izdat " +
      req.body.datum +
      "</b><br> This is our first message sent with Nodemailer<br/>",
  };
  transporter.sendMail(mailData, function (err, info) {
    if (err) console.log(err);
    transporter.close();
  });
};
