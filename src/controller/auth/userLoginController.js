import { loginUserService } from "../../services/authService/loginUserService.js";

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await loginUserService({ email, password });

    return res.status(200).json({
      message: "Login successful",
      data: user,
    });
  } catch (err) {
    return res.status(400).json({
      message: "Login failed",
      error: err.message,
    });
  }
};
