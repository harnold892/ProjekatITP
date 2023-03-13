import exxpress from "express";
import { getSport, addSport } from "../controllers/sport.js";
const router = exxpress.Router();
router.get("/", getSport);
router.post("/", addSport);

export default router;
