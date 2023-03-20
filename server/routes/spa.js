import exxpress from "express";
import { addSpa, getSpa, updateSpa, getSpaAdmin } from "../controllers/spa.js";
const router = exxpress.Router();
router.get("/", getSpa);
router.get("/admin", getSpaAdmin);
router.post("/", addSpa);
router.put("/:id", updateSpa);
export default router;
