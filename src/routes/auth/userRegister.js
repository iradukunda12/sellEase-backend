import express from "express";
import { registerUser } from "../../controller/auth/userRegistration.js";
import { registerValidation } from "../../validation/authValidator.js";
import { validateRequest } from "../../middlewares/validationResult.js";

const router = express.Router();

router.post("/register", registerValidation, validateRequest, registerUser);

export default router;
