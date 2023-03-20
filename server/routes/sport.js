import exxpress from "express";
import { getSport, addSport, getSportAdmin } from "../controllers/sport.js";
const router = exxpress.Router();
router.get("/", getSport);
router.get("/admin", getSportAdmin);
router.post("/", addSport);

export default router;
