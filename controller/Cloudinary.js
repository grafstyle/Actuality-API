"use strict"; // Using strict

// All imports
import { v2 as cloudinary } from "cloudinary";
import * as dontenv from "dotenv";

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
 * To get all options to upload an image.
 * @param { string } url
 */
async function getOptions(url) {
  return {
    use_filename: true,
    unique_filename: false,
    overwrite: true,
    folder: url,
  };
}

/**
 * To upload an image.
 * @param { string } toUrl
 * @param { string } image
 */
export async function addImage(image, toUrl) {
  try {
    return await cloudinary.uploader.upload(image, getOptions(toUrl));
  } catch (err) {
    return err;
  }
}
