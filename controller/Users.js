"use strict";
import { decode, encode } from "../middleware/auth.js";
import { connect } from "../src/DB.js";
import UserSchema from "../models/Users.js";
export const table = connect().collection("Users");

let dataRet;

export async function getLastUserID() {
  dataRet = await decode(await getUsers());
  return encode(dataRet[dataRet.length - 1]["id"]);
}

/**
 * To get data of multiple users
 * @param { UserSchema | undefined } data
 * @returns encoded users
 */
export async function getUsers(data) {
  if (data == undefined) data = {};
  dataRet = await table.find(data).toArray();
  return encode(dataRet);
}

/**
 * To add data in users
 * @param { UserSchema } data
 * @returns
 */
export async function addUser(data) {
  let msg,
    jsonToAdd = {};
  if (data == undefined) return;
  else {
    if (data.id == undefined)
      jsonToAdd["id"] = decode(await getLastUserID()) + 1;
    Object.keys(UserSchema).forEach((keyOfSchema) => {
      Object.keys(data).forEach(async (key) => {
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
 * To update data in users
 * @param { number } inId
 * @param { UserSchema } data
 * @returns
 */
export async function updateUser(inId, data) {
  if ((data == undefined && inId == undefined) || inId < 0) return;
  await table.updateOne({ id: inId }, data);
}

/**
 * To delete data in users
 * @param { number } idToDelete
 * @returns
 */
export async function deleteUser(idToDelete) {
  if (idToDelete == undefined || idToDelete < 0) return;
  await table.deleteOne({ id: idToDelete });
}
