import express from "express";
import { registerUser } from "../../controller/auth/userRegistration.js";
import { registerValidation } from "../../validation/authValidator.js";

const router = express.Router();

router.post("/register", registerValidation, registerUser);

export default router;
