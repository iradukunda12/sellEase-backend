import express from "express";
import { createProductController } from "./../../controller/products/createProduct.js";
import { createProductValidation } from "./../../validation/productValidation.js";
import { authorizeRoles } from "./../../middlewares/authorixation.js";
import { authenticateUser } from "./../../middlewares/auth.js";

const router = express.Router();

router.post(
  "/create-product",
  createProductValidation,
  authenticateUser,
  authorizeRoles("seller"),
  createProductController
);

export default router;
