import express from "express";
const router = express.Router();
import { isAuthenticatedUser, rolAutorizado } from "../middlewares/auth.js";
import {
  registerUser,
  loginUser,
  logout,
  olvidarClave,
  cambiarClave,
  getUserProfile,
  updatePassword,
  updateProfile,
  allUsers,
  getUserDetails,
  updateUser,
  deleteUser,
} from "../controllers/authController.js";

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", logout);
router.post("/olvidarclave", olvidarClave);
router.put("/cambiarclave/:token", cambiarClave);
router.get("/obtenerperfil", isAuthenticatedUser, getUserProfile);
router.put("/actualizarpassword", isAuthenticatedUser, updatePassword);
router.put("/actualizarperfil", isAuthenticatedUser, updateProfile);
router.get(
  "/admin/listarusuarios",
  isAuthenticatedUser,
  rolAutorizado("admin"),
  allUsers
);
router.get(
  "/admin/listarusuario/:id",
  isAuthenticatedUser,
  rolAutorizado("admin"),
  getUserDetails
);
router.put(
  "/admin/actualizarusuario/:id",
  isAuthenticatedUser,
  rolAutorizado("admin"),
  getUserDetails
);
router.delete(
  "/admin/borrarusuario/:id",
  isAuthenticatedUser,
  rolAutorizado("admin"),
  getUserDetails
);
export default router;
