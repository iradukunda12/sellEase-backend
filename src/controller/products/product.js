import { products } from "./../../models/product.js";
import { uploadImageToCloudinary } from "./../../utils/cloudinaryUpload.js";

/**
 * @param {Object} req
 * @param {Object} res
 * @returns {Promise<void>}
 */
export const uploadProductImageController = async (req, res) => {
  try {
    const { id } = req.params;

    if (!req.file) {
      return res.status(400).json({ message: "No image file uploaded" });
    }

    const result = await uploadImageToCloudinary(
      req.file.buffer,
      `product_${id}`
    );

    const product = await products.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    product.imageUrl = result.secure_url;
    await product.save();

    return res.status(200).json({
      message: "Image uploaded successfully",
      imageUrl: product.imageUrl,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error uploading image", error });
  }
};
