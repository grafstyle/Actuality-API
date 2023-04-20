"use strict"; // Using strict.

// All imports.
import { connect } from "../src/DB.js";

/**
 * Current collection getted.
 */
export const table = connect().collection("Likes");

/**
 * Data getted to return.
 */
let dataRet;

/**
 * Getting last like id.
 * @returns last id or 0 if don't get data.
 */
export async function getLastLikeID() {
  dataRet = await getLikes();
  if (dataRet.length == 0) return 0;
  return dataRet[dataRet.length - 1]["id"];
}

/**
 * To get data of multiple likes.
 * @param { LikeSchema | undefined } data
 * @returns likes.
 */
export async function getLikes(data) {
  if (data == undefined) data = {};
  dataRet = await table.find(data).toArray();
  return dataRet;
}

/**
 * To add data in likes.
 * @param { LikeSchema } data
 * @returns message.
 */
export async function addLike(data) {
  let msg;
  if (data == undefined || Object.keys(data).length == 0)
    throw new RangeError("The data is empty or undefined.");
  await table
    .insertOne(data)
    .then(() => {
      msg = "Success";
    })
    .catch((err) => (msg = err));
  return msg;
}

/**
 * To update data in likes.
 * @param { number } inId
 * @param { LikeSchema } data
 * @returns message.
 */
export async function updateLike(inId, data) {
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
 * To delete data in likes.
 * @param { number } idToDelete
 * @returns message.
 */
export async function deleteLike(idToDelete) {
  let msg;
  await table
    .deleteOne({ id: idToDelete })
    .then(() => {
      msg = "Success";
    })
    .catch((err) => (msg = err));
  return msg;
}
