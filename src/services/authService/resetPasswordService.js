import { User } from "./../../models/userRegistration.js";
import { sendEmail } from "../../utils/sendEmail.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
dotenv.config();

export const requestPasswordResetService = async (email) => {
   console.log("[reset service] Received email:", email);

   let user = await User.findOne({ email });
   if (!user) throw new Error("User with this email does not exist");

   console.log("User found:", user.email);

   const otp = Math.floor(100000 + Math.random() * 900000).toString();

   // Hash OTP
   const hashedOtp = await bcrypt.hash(otp, 10);
   const otpExpireTime = Date.now() + 10 * 60 * 1000; // 10 minutes from now

   // Save hashed OTP and expiry time
   user.otpCode = hashedOtp;
   user.otpExpireTime = otpExpireTime;
   await user.save();

   // Sign JWT with user email (don't include OTP)
   const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, {
     expiresIn: "10m",
   });

   const html = `<h2>Your OTP is: <strong>${otp}</strong></h2>`;
   await sendEmail({
     to: user.email,
     subject: "Reset Password OTP",
     html,
   });

   console.log("OTP email sent!");

   return {
     message: "OTP has been sent to your email",
     data: {
       email: user.email,
       token: token,
       expiresIn: "10 minutes",
     },
   };
};
