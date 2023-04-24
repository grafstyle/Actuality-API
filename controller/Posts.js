"use strict"; // Using strict.

// All imports.
import { connect } from "../src/DB.js";

/**
 * Current collection getted.
 */
export const table = connect().collection("Posts");

/**
 * Data getted to return.
 */
let dataRet;

/**
 * Getting last post id.
 * @returns last id or 0 if don't get data.
 */
export async function getLastPostID() {
  dataRet = await getPosts();
  if (dataRet.length == 0) return 0;
  return dataRet[dataRet.length - 1]["id"];
}

/**
 * To get data of multiple posts.
 * @param { PostSchema | undefined } data
 * @returns posts.
 */
export async function getPosts(data) {
  if (data == undefined) data = {};
  dataRet = await table.find(data).toArray();
  return dataRet;
}

/**
 * To add data in posts.
 * @param { PostSchema } data
 * @returns message.
 */
export async function addPost(data) {
  let msg,
    lastID = await getLastPostID();
  if (data == undefined || Object.keys(data).length == 0)
    throw new RangeError("The data is empty or undefined.");
  if (data["id"] == undefined || data["id"] < 0) data["id"] = lastID + 1;
  await table
    .insertOne(data)
    .then(() => {
      msg = "Success";
    })
    .catch((err) => (msg = err));
  return msg;
}

/**
 * To update data in posts.
 * @param { number } inId
 * @param { PostSchema } data
 * @returns message.
 */
export async function updatePost(inId, data) {
  let msg;
  if (data == undefined || Object.keys(data).length == 0)
    throw new RangeError("The data is empty or undefined.");
  await table
    .updateOne({ id: inId }, { $set: data })
    .then(() => {
      msg = "Success";
    })
    .catch((err) => (msg = err));
  return msg;
}

/**
 * To delete data in posts.
 * @param { number } idToDelete
 * @returns message.
 */
export async function deletePost(idToDelete) {
  let msg;
  await table
    .deleteOne({ id: idToDelete })
    .then(() => {
      msg = "Success";
    })
    .catch((err) => (msg = err));
  return msg;
}
