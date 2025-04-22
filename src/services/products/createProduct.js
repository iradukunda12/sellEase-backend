import { products } from './../../models/product.js';

export const createProductService = async (productData) => {
  const newProduct = new products(productData);
  const savedProduct = await newProduct.save();
  return savedProduct;
};
