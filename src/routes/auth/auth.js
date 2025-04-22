import express from "express";
import { registerUser } from "../../controller/auth/userRegistration.js";
import {
  loginValidation,
  registerValidation,
} from "../../validation/authValidator.js";
import { validateRequest } from "../../middlewares/validationRequest.js";
import { loginUser } from "../../controller/auth/userLoginController.js";
import { requestResetController } from "./../../controller/auth/resetPasswordController.js";
import { verifyOtpController } from "./../../controller/auth/verifyOtpController.js";

const router = express.Router();

router.post("/register", registerValidation, validateRequest, registerUser);
router.post("/login", loginValidation, validateRequest, loginUser);
router.post("/reset-password-request", requestResetController);
router.post("/verify-otp", verifyOtpController);

export default router;
