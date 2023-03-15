import express from "express";
import authRoutes from "./routes/auth.js";
import sportRoutes from "./routes/sport.js";
import spaRoutes from "./routes/spa.js";
import nocenjeRoutes from "./routes/nocenja.js";
import cartRoutes from "./routes/cart.js";
import pregledRoutes from "./routes/pregled.js";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import mailRRoutes from "./routes/mail.js";
import nodemailer from "nodemailer";
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/mail", mailRRoutes);
app.use("/server/auth", authRoutes);
app.use("/server/sport", sportRoutes);
app.use("/server/spa", spaRoutes);
app.use("/server/pregled", pregledRoutes);
app.use("/server/nocenje", nocenjeRoutes);
app.use("/server/cart", cartRoutes);
app.listen(3001, () => {
  console.log("running server");
});
