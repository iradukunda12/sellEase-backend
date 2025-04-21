import { requestPasswordResetService } from "../../services/authService/resetPasswordService.js";

export const requestResetController = async (req, res, next) => {
  try {
    const { email } = req.body;
    const response = await requestPasswordResetService(email);
    res.status(200).json(response);
  } catch (err) {
    next(err);
  }
};
