import express from "express";
const router = express.Router();

import {
  getProducts,
  newProduct,
  getSingleProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";
import { isAuthenticatedUser, rolAutorizado } from "../middlewares/auth.js";

router.get(
  "/products",
  isAuthenticatedUser,
  getProducts
);
router.post(
  "/products/new",
  isAuthenticatedUser,
  rolAutorizado("admin"),
  newProduct
);
router.get(
  "/products/:id",
  isAuthenticatedUser,
  rolAutorizado("admin"),
  getSingleProduct
);
router.put(
  "/products/:id",
  isAuthenticatedUser,
  rolAutorizado("admin"),
  updateProduct
);
router.delete(
  "/products/:id",
  isAuthenticatedUser,
  rolAutorizado("admin"),
  deleteProduct
);

export default router;
