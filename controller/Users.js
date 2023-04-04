"use strict";
import { encode } from "../middleware/auth.js";
import { connect } from "../src/DB.js";
export const table = connect().collection("Users");

let dataRet;

export async function getUsers(data) {
  if (data == undefined) data = {};
  dataRet = await table.find(data).toArray();
  return encode(dataRet);
}

export async function getOneUser(data) {
  if (data == undefined) data = {};
  dataRet = await table.findOne(data);
  return encode(dataRet);
}
