import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  phone: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  otpCode: {
    type: String,
  },
  otpExpireTime: {
    type: Date,
  },
});

export const User = mongoose.model("User", userSchema);
