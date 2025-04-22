import { requestPasswordResetService } from "../../services/authService/resetPasswordService.js";

export const requestResetController = async (req, res, next) => {
  try {
    const { email } = req.body;

    console.log("Reset request received for:", email);

    const response = await requestPasswordResetService(email);
    res.status(200).json(response);
  } catch (err) {
    console.error("Error in reset controller:", err.message);
    res.status(500).json({ error: err.message });
  }
};
