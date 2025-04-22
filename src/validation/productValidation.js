import { body } from "express-validator";

export const createProductValidation = [
  body("name").notEmpty().withMessage("Product name is required"),
  body("price").isFloat({ gt: 0 }).withMessage("Price must be greater than 0"),
  body("stock").isInt({ min: 0 }).withMessage("Stock cannot be negative"),
];
