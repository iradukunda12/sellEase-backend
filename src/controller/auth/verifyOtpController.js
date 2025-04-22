import { verifyOtpResetService } from "./../../services/authService/verifyOtpResetService.js";

export const verifyOtpController = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Missing or invalid token" });
    }

    const token = authHeader.split(" ")[1];
    const { otp } = req.body;

    if (!otp) {
      return res.status(400).json({ error: "OTP is required" });
    }

    const result = await verifyOtpResetService(token, otp);
    return res.status(200).json(result);
  } catch (error) {
    console.error("Error in verify OTP controller:", error.message);

    // Smart error handling
    if (/User with this email does not exist/i.test(error.message)) {
      return res.status(404).json({ error: error.message });
    }

    if (/token|jwt/i.test(error.message)) {
      return res.status(401).json({ error: "Invalid or expired token" });
    }

    if (/Invalid OTP/i.test(error.message)) {
      return res.status(400).json({ error: error.message });
    }

    if (/OTP has expired/i.test(error.message)) {
      return res.status(400).json({ error: error.message });
    }

    return res
      .status(500)
      .json({ error: "Server error during OTP verification" });
  }
};
