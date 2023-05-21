"use strict"; // Using strict.

// All imports.
import { connect } from "../src/DB.js";

/**
 * Current collection getted.
 */
export const table = connect().collection("Comments");

/**
 * Data getted to return.
 */
let dataRet;

/**
 * Getting last comments id.
 * @returns last id or 0 if don't get data.
 */
export async function getLastCommentID() {
  dataRet = await getComments();
  if (dataRet.length == 0) return 0;
  return dataRet[dataRet.length - 1]["id"];
}

/**
 * To get data of multiple comments.
 * @param { CommentSchema | undefined } data
 * @returns comments.
 */
export async function getComments(data) {
  if (data == undefined) data = {};
  dataRet = await table.find(data).toArray();
  return dataRet;
}

/**
 * To add data in comments.
 * @param { CommentSchema } data
 * @returns message.
 */
export async function addComment(data) {
  return new Promise((res, rej) => {
    if (data == undefined || Object.keys(data).length == 0)
      rej("The data is empty or undefined.");
    if (data["id"] == undefined || data["id"] < 0)
      getLastCommentID()
        .then((id) => {
          data["id"] = id + 1;
        })
        .catch((err) => rej(err));
    table
      .insertOne(data)
      .then(() => res({ done: true }))
      .catch((err) => rej(err));
  });
}

/**
 * To update data in comments.
 * @param { number } inId
 * @param { CommentSchema } data
 * @returns message.
 */
export async function updateComment(inId, data) {
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
 * To delete data in comments.
 * @param { number } idToDelete
 * @returns message.
 */
export async function deleteComment(idToDelete) {
  return new Promise((res, rej) => {
    table
      .deleteOne({ id: idToDelete })
      .then(() => res({ done: true }))
      .catch((err) => rej(err));
  });
}
