import exxpress from "express";
import { addSport, addSpa, addNocenje, addRacun } from "../controllers/cart.js";
const router = exxpress.Router();
router.post("/sport", addSport);
router.post("/nocenje", addNocenje);
router.post("/spa", addSpa);
router.post("/racun", addRacun);
export default router;
