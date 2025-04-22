import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  userType: {
    type: String,
    enum: ["customer", "seller", "admin"], 
    default: "customer", 
    required: true,
  },
  otpCode: {
    type: String,
  },
  otpExpireTime: {
    type: Date,
  },
});

export const User = mongoose.model("User", userSchema);
