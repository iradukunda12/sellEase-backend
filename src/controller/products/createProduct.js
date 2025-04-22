import { createProductService } from "./../../services/products/createProduct.js";

export const createProductController = async (req, res) => {
  try {
    const sellerId = req.user.id;

    const { name, description, price, stock, category, tags } = req.body;

    const productData = {
      seller: sellerId,
      name,
      description,
      price,
      stock,
      category,
      tags,
    };

    const product = await createProductService(productData);

    res.status(201).json({
      message: "Product created successfully",
      product,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
