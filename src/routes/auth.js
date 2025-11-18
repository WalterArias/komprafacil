import express from "express";
const router = express.Router();

import {
  registerUser,
  loginUser,
  logout,
  recuperarClave,
} from "../controllers/authController.js";

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", logout);
router.post("/recuperarclave", recuperarClave);

export default router;
