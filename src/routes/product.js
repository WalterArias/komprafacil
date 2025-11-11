import express from "express";
const router = express.Router();

import {
  getProducts,
  //   getAdminProducts,
  //   newProduct,
  //   getSingleProduct,
  //   updateProduct,
  //   deleteProduct,
  //   createProductReview,
  //   getProductReviews,
  //   deleteReview,
} from "../controllers/productController.js";

// const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");

router.get("/products", getProducts);
// router.route("/admin/products").get(getAdminProducts);
// router.route("/product/:id").get(getSingleProduct);

// router
//   .route("/admin/product/new")
//   .post(isAuthenticatedUser, authorizeRoles("admin"), newProduct);

// router
//   .route("/admin/product/:id")
//   .put(isAuthenticatedUser, authorizeRoles("admin"), updateProduct)
//   .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteProduct);

// router.route("/review").put(isAuthenticatedUser, createProductReview);
// router.route("/reviews").get(isAuthenticatedUser, getProductReviews);
// router.route("/reviews").delete(isAuthenticatedUser, deleteReview);

export default router;
