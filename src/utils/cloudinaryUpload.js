import cloudinary from "./../../config/cloudinaryConfig.js";
import { Readable } from "stream";

/**
 * Upload image to Cloudinary
 * @param {Buffer} imageBuffer - The image buffer from Multer
 * @param {string} publicId - The public ID for Cloudinary (can be product-specific)
 * @returns {Promise<object>} - The result from Cloudinary upload
 */
export const uploadImageToCloudinary = (imageBuffer, publicId) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        resource_type: "auto",
        folder: "products",
        public_id: publicId,
      },
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    );

    const readableStream = new Readable();
    readableStream.push(imageBuffer);
    readableStream.push(null);
    readableStream.pipe(uploadStream);
  });
};
