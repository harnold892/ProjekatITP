import nodemailer from "nodemailer";
import moment from "moment";
const transporter = nodemailer.createTransport({
  pool: true,
  port: 465, // true for 465, false for other ports
  host: "smtp.gmail.com",
  auth: {
    user: "misomisic529@gmail.com",
    pass: "",
  },
  secure: true,
});
export const sendRacun = (req, res) => {
  let message =
    '<table style="border: 1px solid #333;">' +
    "<tr>" +
    "<th>Naziv aktivnosti ili broj sobe</th>" +
    "<th>Datum pocetka rezervacije </th>" +
    "<th>Datum zavrsetka rezervacije </th>" +
    "<th>Cijena po osobi ili po danu </th>" +
    "</tr>";
  if (req.body.nocenja.length > 0) {
    req.body.nocenja.forEach((element) => {
      message +=
        "<tr>" +
        "<th>" +
        element.ID_SOBA +
        "</th>" +
        "<th>" +
        moment(element.DATUM_DOLASKA).format("DD/MM/YYYY") +
        " </th>" +
        "<th>" +
        moment(element.DATUM_ODLASKA).format("DD/MM/YYYY") +
        "</th>" +
        "<th>" +
        element.CIJENA_KM_SOBA +
        " </th>" +
        "</tr>";
    });
  }
  if (req.body.sport.length > 0) {
    req.body.sport.forEach((element) => {
      message +=
        "<tr>" +
        "<th>" +
        element.VRSTA_SPORT +
        "</th>" +
        "<th>" +
        moment(element.DATUM_POCETKA_SPORT).format("DD/MM/YYYY") +
        " </th>" +
        "<th>" +
        moment(element.DATUM_ZAVRSETKA_SPORT).format("DD/MM/YYYY") +
        "</th>" +
        "<th>" +
        element.CIJENA_SPORT +
        " </th>" +
        "</tr>";
    });
  }
  if (req.body.spa.length > 0) {
    req.body.spa.forEach((element) => {
      message +=
        "<tr>" +
        "<th>" +
        element.NAZIV_SPA +
        "</th>" +
        "<th>" +
        moment(element.DATUM_POCETKA_SPA).format("DD/MM/YYYY") +
        " </th>" +
        "<th>" +
        moment(element.DATUM_ZAVRSETKA_SPA).format("DD/MM/YYYY") +
        "</th>" +
        "<th>" +
        element.CIJENA_SPA +
        " </th>" +
        "</tr>";
    });
  }
  message +=
    "<tr>" +
    "<th>UKUPNA CIJENA" +
    "</th>" +
    "<th>" +
    " </th>" +
    "<th>" +
    "</th>" +
    "<th>" +
    req.body.cijena_r +
    " </th>" +
    "</tr>";
  const mailData = {
    from: "misomisic529@gmail.com", // sender address
    to: req.body.to, // list of receivers
    subject: "Racun iz Hotela",
    text: "That was easy!",
    html:
      "<b>Uprilogu se nalazi racun izdat " +
      moment(req.body.datum).format("DD/MM/YYYY") +
      "</b>" +
      message,
  };
  transporter.sendMail(mailData, function (err, info) {
    if (err) console.log(err);
    transporter.close();
  });
};
