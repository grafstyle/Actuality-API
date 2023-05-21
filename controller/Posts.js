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
  return new Promise((res, rej) => {
    if (data == undefined || Object.keys(data).length == 0)
      rej("The data is empty or undefined.");
    (async () => {
      if (data["id"] == undefined || data["id"] < 0)
        data["id"] = (await getLastPostID()) + 1;
      table
        .insertOne(data)
        .then(() => res({ done: true }))
        .catch((err) => rej(err));
    })();
  });
}

/**
 * To update data in posts.
 * @param { number } inId
 * @param { PostSchema } data
 * @returns message.
 */
export async function updatePost(inId, data) {
  return new Promise((res, rej) => {
    if (data == undefined || Object.keys(data).length == 0)
      rej("The data is empty or undefined.");
    table
      .updateOne({ id: inId }, { $set: data })
      .then(() => res({ done: true }))
      .catch((err) => rej(err));
  });
}

/**
 * To delete data in posts.
 * @param { number } idToDelete
 * @returns message.
 */
export async function deletePost(idToDelete) {
  return new Promise((res, rej) => {
    table
      .deleteOne({ id: idToDelete })
      .then(() => res({ done: true }))
      .catch((err) => rej(err));
  });
}
