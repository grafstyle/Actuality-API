"use strict";
import { connect } from "../src/DB.js";
export const table = connect().collection("Users");

export async function getUser(data) {
  if (data == undefined) return table.find().toArray();
  return table.find(data).toArray();
}

export async function getOneUser(data) {
  if (data == undefined) return table.findOne();
  return table.findOne(data);
}
