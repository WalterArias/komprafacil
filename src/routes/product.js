import express from "express";
const router = express.Router();

import {
  getProducts,
  newProduct,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  //   createProductReview,
  //   getProductReviews,
  //   deleteReview,
} from "../controllers/productController.js";

router.get("/products", getProducts);
router.post("/products/new", newProduct);
router.get("/products/:id", getSingleProduct);
router.put("/products/:id", updateProduct);
router.delete("/products/:id", deleteProduct);

// router.route("/review").put(isAuthenticatedUser, createProductReview);
// router.route("/reviews").get(isAuthenticatedUser, getProductReviews);
// router.route("/reviews").delete(isAuthenticatedUser, deleteReview);

export default router;
