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

    product.images.push({
      url: result.secure_url,
      public_id: result.public_id,
    });

    await product.save();

    return res.status(200).json({
      message: "Image uploaded successfully",
      imageUrl: result.secure_url,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error uploading image", error });
  }
};

export const getSellerProductsController = async (req, res) => {
  try {
    const seller = req.user._id;

    const myProducts = await products.find({ seller: seller });

    res.status(200).json({
      message: "Products fetched successfully",
      count: myProducts.length,
      products: myProducts,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch products", error });
  }
};

export const getSellerFilteredProducts = async (req, res) => {
  try {
    const seller = req.user._id;
    const { category, tag, sort, page = 1, limit = 10 } = req.query;

    const filter = { seller };

    if (category) {
      filter.category = category;
    }

    if (tag) {
      filter.tags = tag;
    }

    let sortOption = { createdAt: -1 };
    if (sort === "price_asc") {
      sortOption = { price: 1 };
    } else if (sort === "price_desc") {
      sortOption = { price: -1 };
    }

    const skip = (page - 1) * limit;

    const productsList = await products
      .find(filter)
      .sort(sortOption)
      .skip(skip)
      .limit(parseInt(limit));

    const totalProducts = await products.countDocuments(filter);

    return res.status(200).json({
      message: "Seller products fetched successfully",
      total: totalProducts,
      page: parseInt(page),
      limit: parseInt(limit),
      products: productsList,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error fetching products", error });
  }
};

export const updateProductController = async (req, res) => {
  try {
    const { id } = req.params;
    const seller = req.user._id;

    const product = await products.findOne({ _id: id, seller: seller });
    if (!product) {
      return res
        .status(404)
        .json({ message: "Product not found or not authorized" });
    }

    const allowedUpdates = [
      "name",
      "price",
      "description",
      "category",
      "tags",
      "stock",
    ];
    allowedUpdates.forEach((field) => {
      if (req.body[field] !== undefined) {
        product[field] = req.body[field];
      }
    });

    await product.save();

    return res
      .status(200)
      .json({ message: "Product updated successfully", product });
  } catch (error) {
    console.error("Update error:", error);
    return res.status(500).json({ message: "Server error", error });
  }
};

export const deleteProductController = async (req, res) => {
  try {
    const { id } = req.params;
    const seller = req.user._id;

    const product = await products.findOneAndDelete({
      _id: id,
      seller: seller,
    });
    if (!product) {
      return res
        .status(404)
        .json({ message: "Product not found or not authorized" });
    }

    return res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Delete error:", error);
    return res.status(500).json({ message: "Server error", error });
  }
};

export const getSellersWithProducts = async (req, res) => {
  try {
    const sellers = await products.aggregate([
      {
        $group: {
          _id: "$seller",
          totalProducts: { $sum: 1 },
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "sellerInfo",
        },
      },
      { $unwind: "$sellerInfo" },
      {
        $project: {
          sellerId: "$_id",
          name: "$sellerInfo.name",
          shopname: "$sellerInfo.shopname", 
          totalProducts: 1,
        },
      },
    ]);

    res.status(200).json({ sellers });
  } catch (error) {
    res.status(500).json({ message: "Failed to get sellers", error });
  }
};


export const viewAllproductbySpecificSellerController = async (req, res) => {
  try {
    const { sellerId } = req.params;
    const {
      category,
      tags,
      search,
      sort = "latest",
      page = 1,
      limit = 10,
    } = req.query;

    const filter = { seller: sellerId };

    if (category) filter.category = category;
    if (tags) filter.tags = { $in: tags.split(",") };
    if (search) filter.name = { $regex: search, $options: "i" };

    const sortOption = sort === "price" ? { price: 1 } : { createdAt: -1 };

    const productsList = await products
      .find(filter)
      .sort(sortOption)
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    res.status(200).json({ products: productsList });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch seller products", error });
  }
};
