import mongoose, { Mongoose } from "mongoose";

const productSchema = new mongoose.Schema(
  {
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
    },
    price: {
      type: Number,
      required: true,
    },
    stock: {
      type: Number,
      default: 0,
    },
    category: String,
    tags: [String],
    images: [
      {
        url: String,
        public_id: String,
      },
    ],
  
  },
  { timeStamps: true }
);
export const products = mongoose.model("products", productSchema);
