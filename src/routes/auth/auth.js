import express from "express";
import { registerUser } from "../../controller/auth/userRegistration.js";
import {
  loginValidation,
  registerValidation,
  createNewPasswordValidation,
} from "../../validation/authValidator.js";
import { validateRequest } from "../../middlewares/validationRequest.js";
import { loginUser } from "../../controller/auth/userLoginController.js";
import { requestResetController } from "./../../controller/auth/resetPasswordController.js";
import { verifyOtpController } from "./../../controller/auth/verifyOtpController.js";
import { createNewPasswordController } from "./../../controller/auth/createNewPasswordController.js";
import { switchUserRole } from "./../../controller/userSwitch/switchRoles.js";

const router = express.Router();

router.post("/register", registerValidation, validateRequest, registerUser);
router.post("/login", loginValidation, validateRequest, loginUser);
router.post("/reset-password-request", requestResetController);
router.post("/verify-otp", verifyOtpController);
router.post(
  "/create-new-password",
  createNewPasswordValidation,
  validateRequest,
  createNewPasswordController
);

export default router;
