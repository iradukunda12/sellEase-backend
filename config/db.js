import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const mongodbURL = process.env.MongoDB_URL;
console.log("MONGO_URL:", process.env.MongoDB_URL);

if (!mongodbURL) {
  throw new Error("MongoDB URL is not found");
}

export const connectDB = async () => {
  try {
    await mongoose.connect(mongodbURL);
    console.log("MongoDB connected");
  } catch (err) {
    console.log("MongoDB connection error:", err);
    process.exit(1);
  }
};
