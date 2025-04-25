import { Cart } from "../../models/cart.js";
import { Orders } from "./../../models/orders.js";

export const addToCart = async (req, res) => {
  const userId = req.user._id;
  const { productId, quantity = 1 } = req.body;

  try {
    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      cart = new Cart({ user: userId, items: [] });
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.product.toString() === productId
    );

    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += quantity;
    } else {
      cart.items.push({ product: productId, quantity });
    }

    await cart.save();

    res.status(200).json({ message: "Added to cart", cart });
  } catch (error) {
    console.error("Add to cart error:", error);
    return res.status(500).json({
      message: "Failed to add to cart",
      error: error.message || error,
    });
  }
};

export const checkoutOrder = async (req, res) => {
  const userId = req.user._id;
  const { shippingAddress } = req.body;

  try {
    const cart = await Cart.findOne({ user: userId }).populate("items.product");

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    const totalAmount = cart.items.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );

    const orderItems = cart.items.map((item) => ({
      product: item.product._id,
      name: item.product.name,
      price: item.product.price,
      quantity: item.quantity,
    }));

    const newOrder = new Orders({
      user: userId,
      items: orderItems,
      totalAmount,
      shippingAddress,
      status: "confirmed",
    });

    await newOrder.save();
    await Cart.deleteOne({ user: userId });

    res
      .status(200)
      .json({ message: "Order placed successfully", order: newOrder });
  } catch (error) {
    console.error("Checkout error:", error);
    res.status(500).json({
      message: "Checkout failed",
      error: error.message || "Unknown error",
    });
  }
};

export const getMyOrders = async (req, res) => {
  const userId = req.user._id;

  try {
    const orders = await Orders.find({ user: userId })
      .sort({ createdAt: -1 })
      .populate("items.product");

    res.status(200).json({ orders });
  } catch (error) {
    res.status(500).json({ message: "Failed to get orders", error });
  }
};

export const viewCart = async (req, res) => {
  const userId = req.user._id;

  try {
    const cart = await Cart.findOne({ user: userId }).populate("items.product");

    if (!cart || cart.items.length === 0) {
      return res.status(404).json({ message: "Your cart is empty." });
    }

    res.status(200).json({ message: "Cart fetched successfully", cart });
  } catch (error) {
    console.error("View cart error:", error);
    res.status(500).json({
      message: "Failed to fetch cart",
      error: error.message || error,
    });
  }
};
