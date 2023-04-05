"use strict";
import { encode } from "../middleware/auth.js";
import { connect } from "../src/DB.js";
import UserSchema from "../models/Users.js";
export const table = connect().collection("Users");

let dataRet;

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
 * To get data of one user
 * @param { UserSchema | undefined } data
 * @returns encoded user
 */
export async function getOneUser(data) {
  if (data == undefined) data = {};
  dataRet = await table.findOne(data);
  return encode(dataRet);
}
