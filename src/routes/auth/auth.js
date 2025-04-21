import express from "express";
import { registerUser } from "../../controller/auth/userRegistration.js";
import {
  loginValidation,
  registerValidation,
} from "../../validation/authValidator.js";
import { validateRequest } from "../../middlewares/validationRequest.js";
import { authenticateUser } from "../../middlewares/auth.js";
import { loginUser } from "../../controller/auth/userLoginController.js";

const router = express.Router();

router.post("/register", registerValidation, validateRequest, registerUser);
router.post("/login", loginValidation, validateRequest, loginUser);

export default router;
