import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import { User } from "./../../models/userRegistration.js";

dotenv.config();

export const verifyOtpResetService = async (token, submittedOtp) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { email } = decoded;

    if (!email) {
      throw new Error("Invalid token or missing email in token");
    }

    const user = await User.findOne({ email });

    if (!user) {
      throw new Error("User with this email does not exist");
    }

    if (Date.now() > user.otpExpireTime) {
      throw new Error("OTP has expired");
    }

    const isOtpValid = await bcrypt.compare(submittedOtp, user.otpCode);

    if (!isOtpValid) {
      throw new Error("Invalid OTP");
    }

    // Clear OTP after successful verification (optional but recommended)
    user.otpCode = undefined;
    user.otpExpireTime = undefined;
    await user.save();

    return {
      message: "OTP verified successfully",
        data: {
            email: user.email,
            
            
      }
    };
  } catch (error) {
    console.error("Service error details:", error);
    throw new Error(error.message || "Token is invalid or has expired");
  }
};
