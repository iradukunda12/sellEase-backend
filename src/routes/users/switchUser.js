import express from "express";
import { switchUserRole } from "./../../controller/userSwitch/switchRoles.js";
import { authenticateUser } from "./../../middlewares/auth.js";

const router = express.Router();

router.patch("/switch-role", authenticateUser, switchUserRole);

export default router;
