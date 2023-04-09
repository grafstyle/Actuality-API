"use strict";
import { decode, encode } from "../middleware/auth.js";
import { connect } from "../src/DB.js";
import CommentSchema from "../models/Comments.js";
export const table = connect().collection("Comments");

let dataRet;

export async function getLastCommentID() {
  dataRet = await decode(await getComments());
  if (dataRet.length == 0) return encode(0);
  return encode(dataRet[dataRet.length - 1]["id"]);
}

/**
 * To get data of multiple comments
 * @param { CommentSchema | undefined } data
 * @returns encoded comments
 */
export async function getComments(data) {
  if (data == undefined) data = {};
  dataRet = await table.find(data).toArray();
  return encode(dataRet);
}

/**
 * To add data in comments
 * @param { CommentSchema } data
 * @returns
 */
export async function addComment(data) {
  let msg,
    jsonToAdd = {};
  if (data == undefined || Object.keys(data).length == 0)
    throw new RangeError("The data is empty or undefined.");
  else {
    if (data.id == undefined)
      jsonToAdd["id"] = decode(await getLastCommentID()) + 1;
    Object.keys(CommentSchema).forEach((keyOfSchema) => {
      Object.keys(data).forEach(async (key) => {
        if (keyOfSchema == "id") return;
        if (key == keyOfSchema) jsonToAdd[key] = data[key];
        else jsonToAdd[keyOfSchema] = null;
      });
    });
  }
  await table
    .insertOne(jsonToAdd)
    .then(() => {
      msg = "Success";
    })
    .catch((err) => (msg = err));
  return msg;
}

/**
 * To update data in comments
 * @param { number } inId
 * @param { CommentSchema } data
 * @returns
 */
export async function updateComment(inId, data) {
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
 * To delete data in comments
 * @param { number } idToDelete
 * @returns
 */
export async function deleteComment(idToDelete) {
  let msg;
  await table
    .deleteOne({ id: idToDelete })
    .then(() => {
      msg = "Success";
    })
    .catch((err) => (msg = err));
  return msg;
}
