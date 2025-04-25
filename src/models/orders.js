import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    items: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: "products" },
        quantity: Number,
      },
    ],
    totalAmount: Number,
    status: { type: String, default: "pending" },
    shippingAddress: String,
  },
  { timestamps: true }
);
export const Orders = mongoose.model("Order", orderSchema);
