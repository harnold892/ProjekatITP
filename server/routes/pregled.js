import exxpress from "express";
import { getSport, getSpa, getNocenja } from "../controllers/pregled.js";
const router = exxpress.Router();
router.get("/sport/:id", getSport);
router.get("/nocenje/:id", getNocenja);
router.get("/spa/:id", getSpa);
export default router;
