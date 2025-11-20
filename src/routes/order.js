import express from "express";
const router = express.Router();
import {
  newOrder,
  getSingleOrder,
  myOrders,
  updateOrder,deleteOrder
} from "../controllers/orderController.js";

import { isAuthenticatedUser, rolAutorizado } from "../middlewares/auth.js";

router.post(
  "/orders/new",
  isAuthenticatedUser,

  newOrder
);
router.get(
  "/orders/:id",
  isAuthenticatedUser,

  getSingleOrder
);
router.get("/orders/misordenes/:id", isAuthenticatedUser, myOrders);

router.put(
  "/admin/orders/:id",
  isAuthenticatedUser,
  rolAutorizado("admin"),
  updateOrder
);

router.delete(
  "/admin/orders/:id",
  isAuthenticatedUser,
  rolAutorizado("admin"),
  deleteOrder
);
export default router;
