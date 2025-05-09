import mongoose from "mongoose";



const cartSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    items: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: "products" },
        quantity: { type: Number, default: 1 },
      },
    ],
  },
  { timestamps: true }
);

export const Cart = mongoose.model("Cart", cartSchema);
