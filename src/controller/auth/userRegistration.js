import { registerUserService } from "../../services/auth/registerUserService.js";

export const registerUser = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;
    console.log("received data", req.body);

    const userData = await registerUserService({
      name,
      email,
      phone,
      password,
    });

    return res.status(201).json({
      message: "User registered sucessfully",
      data: userData,
    });
  } catch (err) {
    console.log("error in the user registration", err);

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
        error: err.message,
      });
    }

    res.status(500).json({
      message: "internal server error",
      error: err.message,
    });
  }
};
