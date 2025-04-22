import { createNewPasswordService } from "./../../services/authService/createNewPasswordService.js";

export const createNewPasswordController = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Missing or invalid token" });
    }

    const token = authHeader.split(" ")[1];
    const { newPassword, confirmPassword } = req.body;

    if (!newPassword || !confirmPassword) {
      return res
        .status(400)
        .json({ error: "Both password fields are required" });
    }

    const response = await createNewPasswordService(
      token,
      newPassword,
      confirmPassword
    );
    res.status(200).json(response);
  } catch (error) {
    console.error("Reset password controller error:", error.message);
    res.status(500).json({ error: error.message });
  }
};
