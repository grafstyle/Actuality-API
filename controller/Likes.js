"use strict";
import { decode, encode } from "../middleware/auth.js";
import { connect } from "../src/DB.js";
import LikeSchema from "../models/Likes.js";
export const table = connect().collection("Likes");

let dataRet;

export async function getLastLikeID() {
  dataRet = await decode(await getLikes());
  if (dataRet.length == 0) return encode(0);
  return encode(dataRet[dataRet.length - 1]["id"]);
}

/**
 * To get data of multiple likes
 * @param { LikeSchema | undefined } data
 * @returns encoded likes
 */
export async function getLikes(data) {
  if (data == undefined) data = {};
  dataRet = await table.find(data).toArray();
  return encode(dataRet);
}

/**
 * To add data in likes
 * @param { LikeSchema } data
 * @returns
 */
export async function addLike(data) {
  let msg,
    jsonToAdd = {};
  if (data == undefined || Object.keys(data).length == 0)
    throw new RangeError("The data is empty or undefined.");
  else {
    if (data.id == undefined)
      jsonToAdd["id"] = decode(await getLastLikeID()) + 1;
    Object.keys(LikeSchema).forEach((keyOfSchema) => {
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
 * To update data in likes
 * @param { number } inId
 * @param { LikeSchema } data
 * @returns
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
 * To delete data in likes
 * @param { number } idToDelete
 * @returns
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
