import { User } from "./../../models/userRegistration.js";
import jwt from "jsonwebtoken";

export const switchUserRole = async (req, res) => {
  try {
    const { userType } = req.body;

    if (!["customer", "seller"].includes(userType)) {
      return res.status(400).json({ message: "Invalid role selected" });
    }

    // Update role
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { userType },
      { new: true, runValidators: true }
    );

    const token = jwt.sign(
      {
        _id: user._id,
        email: user.email,
        name: user.name,
        userType: user.userType,
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || "1d" }
    );

    res.status(200).json({
      message: `User role updated to ${userType}`,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        userType: user.userType,
        phone: user.phone,
      },
      token,
    });
  } catch (error) {
    console.error("Error switching role:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};
