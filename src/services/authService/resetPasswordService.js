import { User } from "./../../models/userRegistration.js";
import { sendEmail } from "../../utils/sendEmail.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const requestPasswordResetService = async (email) => {
  console.log("[reset service] Received email:", email);

  let user = await User.findOne({ email });

  if (!user) {
    console.log(" User not found:", email);
    throw new Error("User with this email does not exist");
  }

  console.log("User found:", user.email);

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const expiresIn = 10 * 60;
  const token = jwt.sign(
    { id: user._id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn }
  );

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
      expiresIn: `${expiresIn / 60} minutes`,
    },
  };
};
