import express from "express";
import { authenticateUser } from "./../../middlewares/auth.js";
import {
  addToCart,
  checkoutOrder,
  getMyOrders,
  viewCart,
} from "../../controller/Orders/cart.js";

const router = express.Router();

router.post("/cart/add", authenticateUser, addToCart);
router.post("/checkout", authenticateUser, checkoutOrder);
router.get("/my-orders", authenticateUser, getMyOrders);
router.get("/viewCart", authenticateUser, viewCart);

export default router;
