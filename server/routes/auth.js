import exxpress from "express";
import {
  register,
  login,
  logout,
  registracija_admin,
  getAdmin,
  deleteAdmin,
  addAdmin,
} from "../controllers/auth.js";
const router = exxpress.Router();
router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.post("/registracija", registracija_admin);
router.get("/getadmin", getAdmin);
router.get("/deleteadmin/:username", deleteAdmin);
router.post("/dodajadmina", addAdmin);
export default router;
