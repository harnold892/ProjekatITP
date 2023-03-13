import exxpress from "express";
import { addSpa, getSpa, updateSpa } from "../controllers/spa.js";
const router = exxpress.Router();
router.get("/", getSpa);
router.post("/", addSpa);
router.put("/:id", updateSpa);
export default router;
