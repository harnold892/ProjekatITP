import exxpress from "express";
import { getNocenja,getNocenjaAdmin } from "../controllers/nocenja.js";
const router = exxpress.Router();
router.get("/:dolazak/:odlazak", getNocenja);
router.get("/", getNocenjaAdmin);
export default router;
