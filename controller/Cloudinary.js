"use strict"; // Using strict

// All imports
import { v2 as cloudinary } from "cloudinary";
import * as dontenv from "dotenv";

// JSON type of schema.
let ImageInfo = {
  image: "",
  name: "",
  url: "",
};

/**
 * To set all configs of cloudinary.
 */
export function config() {
  dontenv.config();

  cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
  });
}

/**
 * To upload an image.
 * @param { ImageInfo } imageData
 */
export async function addImage(imageData) {
  try {
    return await cloudinary.uploader.upload(imageData.image, {
      use_filename: true,
      unique_filename: false,
      overwrite: true,
      filename_override: imageData.name,
      folder: imageData.url,
    });
  } catch (err) {
    return err;
  }
}
