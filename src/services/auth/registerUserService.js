import { User } from "../../models/userRegistration.js";
import bcrypt from "bcryptjs";

export const registerUserService = async ({ name, email, phone, password }) => {
  const existingUser = await User.findOne({
    $or: [{ email }, { phone }],
  });
  if (existingUser) {
    throw new Error("User already exists");
  }

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);

  const newUser = await User.create({
    name,
    email,
    phone,
    password: hashPassword,
  });

  const user = {
    _id: newUser._id,
    name: newUser.name,
    email: newUser.email,
    phone: newUser.phone,
  };

  return user;
};
