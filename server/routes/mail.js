import exxpress from "express";

import { sendRacun } from "../controllers/mail.js";
const router = exxpress.Router();
router.post("/", sendRacun);
export default router;
