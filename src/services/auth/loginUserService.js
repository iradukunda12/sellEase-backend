import { User } from "./../../models/userRegistration.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const loginUserService = async ({ email, password }) => {
  const existingUser = await User.findOne({ email });

  if (!existingUser) {
    throw new Error("Invalid email or password");
  }

  const isMatch = await bcrypt.compare(password, existingUser.password);

  if (!isMatch) {
    throw new Error("Invalid email or password");
  }

  const token = jwt.sign(
    {
      _id: existingUser._id,
      email: existingUser.email,
      name: existingUser.name,
      userType: existingUser.userType,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN || "1d",
    }
  );

  return {
    _id: existingUser._id,
    name: existingUser.name,
    email: existingUser.email,
    phone: existingUser.phone,
    userType: existingUser.userType,
    token,
  };
};
