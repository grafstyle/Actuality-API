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
export function addLike(data) {
  return new Promise((res, rej) => {
    let lastID = getLastLikeID();
    if (data == undefined || Object.keys(data).length == 0)
      rej("The data is empty or undefined.");
    if (data["id"] == undefined || data["id"] < 0)
      data["id"] = async () => (await lastID) + 1;
    table
      .insertOne(data)
      .then(() => res({ done: true }))
      .catch((err) => rej(err));
  });
}

/**
 * To update data in likes.
 * @param { number } inId
 * @param { LikeSchema } data
 * @returns message.
 */
export async function updateLike(inId, data) {
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
 * To delete data in likes.
 * @param { number } idToDelete
 * @returns message.
 */
export async function deleteLike(idToDelete) {
  return new Promise((res, rej) => {
    table
      .deleteOne({ id: idToDelete })
      .then(() => res({ done: true }))
      .catch((err) => rej(err));
  });
}
