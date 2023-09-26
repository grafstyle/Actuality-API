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
    cloud_name: ${{ secrets.CLOUD_NAME}} ,
    api_key: ${{ secrets.CLOUDINARY_API_KEY}},
    api_secret: ${{ secrets.CLOUDINARY_API_SECRET}},
    secure: true,
  });
}

/**
 * To format urls to eliminate it in cloudinary.
 * @param { string } url
 */
function getDirAndName(url) {
  const completeURL = `https://res.cloudinary.com/${{ secrets.CLOUD_NAME}}/image/upload/`;
  let fileAndDir;
  if (url.includes(completeURL)) {
    url = url.replace(completeURL, "");
    let dirs = url.split("/");
    dirs = dirs.splice(1, dirs.length);
    let dirStr = "";
    dirs.forEach((dir, i) => {
      if (i == 0) dirStr += dir;
      else dirStr += "/" + dir;
    });
    fileAndDir = dirStr.split(".")[0];
  } else fileAndDir = url.split(".")[0];
  return fileAndDir;
}

/**
 * To upload an image.
 * @param { ImageInfo } imageData
 */
export function addFile(imageData) {
  return new Promise((res, rej) => {
    cloudinary.uploader
      .upload(imageData.image, {
        use_filename: true,
        unique_filename: false,
        overwrite: true,
        filename_override: imageData.name,
        folder: imageData.url,
        resource_type: "auto",
      })
      .then((done) => res(done))
      .catch((err) => rej(err));
  });
}

/**
 * To delete an image.
 * @param { string } url
 */
export function deleteFile(url) {
  return new Promise((res, rej) => {
    cloudinary.uploader
      .destroy(getDirAndName(url))
      .then((done) => res(done))
      .catch((err) => rej(err));
  });
}
