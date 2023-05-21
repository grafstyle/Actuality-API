"use strict"; // Using strict.

// All Imports.
import { connect } from "../src/DB.js";

/**
 * Current collection getted.
 */
export const table = connect().collection("Users");

/**
 * Data getted to return.
 */
let dataRet;

/**
 * Getting last users id.
 * @returns last id or 0 if don't get data.
 */
export async function getLastUserID() {
  dataRet = await getUsers();
  if (dataRet.length == 0) return 0;
  return dataRet[dataRet.length - 1]["id"];
}

/**
 * To get data of multiple users.
 * @param { JSON | undefined } data
 * @returns encoded users.
 */
export async function getUsers(data) {
  if (data == undefined) data = {};
  dataRet = await table.find(data).toArray();
  return dataRet;
}

/**
 * To add data in users.
 * @param { JSON } data
 * @returns message.
 */
export async function addUser(data) {
  return new Promise((res, rej) => {
    if (data == undefined || Object.keys(data).length == 0)
      rej("The data is empty or undefined.");
    if (data["id"] == undefined || data["id"] < 0)
      getLastUserID()
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
 * To update data in users.
 * @param { number } inId
 * @param { JSON } data
 * @returns message.
 */
export async function updateUser(inId, data) {
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
 * To delete data in users.
 * @param { number } idToDelete
 * @returns message.
 */
export async function deleteUser(idToDelete) {
  return new Promise((res, rej) => {
    table
      .deleteOne({ id: idToDelete })
      .then(() => res({ done: true }))
      .catch((err) => rej(err));
  });
}
