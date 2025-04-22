import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import { User } from "../../models/userRegistration.js";

dotenv.config();

export const createNewPasswordService = async (
  token,
  newPassword,
  confirmPassword
) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { email } = decoded;
    if (!email) {
      throw new Error("Invalid or expired token");
    }

    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("User not found");
    }

    if (newPassword !== confirmPassword) {
      throw new Error("Passwords do not match");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    user.password = hashedPassword;

    // Optional cleanup: clear OTP-related fields
    user.otpCode = undefined;
    user.otpExpireTime = undefined;

    await user.save();

    return {
      message: "Password reset successfully",
      email: user.email,
    };
  } catch (error) {
    console.error("Reset password service error:", error);
    throw new Error(error.message || "Failed to reset password");
  }
};
