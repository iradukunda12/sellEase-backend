import express from "express";
import { createProductController } from "./../../controller/products/createProduct.js";
import { createProductValidation } from "./../../validation/productValidation.js";
import { authorizeRoles } from "./../../middlewares/authorixation.js";
import { authenticateUser } from "./../../middlewares/auth.js";
import multer from "multer";
import {
  uploadProductImageController,
  getSellerFilteredProducts,
  getSellerProductsController,
  deleteProductController,
  updateProductController,
  getSellersWithProducts,
  viewAllproductbySpecificSellerController,
} from "./../../controller/products/product.js";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post(
  "/create-product",
  createProductValidation,
  authenticateUser,
  authorizeRoles("seller"),
  createProductController
);
router.post(
  "/:id/upload-image",
  authenticateUser,
  upload.single("image"),
  uploadProductImageController
);
router.get(
  "/getAllSellerProduct",
  authenticateUser,
  getSellerProductsController
);
router.get("/my-products", authenticateUser, getSellerFilteredProducts);
router.put("/my-products/:id", authenticateUser, updateProductController);
router.delete("/my-products/:id", authenticateUser, deleteProductController);
router.get("/sellers-with-products", getSellersWithProducts);
router.get(
  "/seller-products/:sellerId",
  viewAllproductbySpecificSellerController
);

export default router;
