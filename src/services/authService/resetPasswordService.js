import { User } from "./../../models/userRegistration.js";
import { sendEmail } from "../../utils/sendEmail.js";

export const requestPasswordResetService = async (email) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("User with this email does not exist");
  }

  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  const otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000);

  user.otp = otp;
  user.otpExpiresAt = otpExpiresAt;
  await user.save();

  await sendEmail(
    user.email,
    "Password Reset OTP",
    `Your OTP code is ${otp}. It expires in 10 minutes.`
  );

  return {
    message: "OTP sent to your email",
  };
};
