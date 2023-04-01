"use strict";
import { connect, close } from "../src/DB.js";
export let table = connect().collection("Users");

export async function get(data) {
  if (data == undefined) return table.find().toArray();
  return table.find(data).toArray();
}

export async function getOne(data) {
  if (data == undefined) return table.findOne();
  return table.findOne(data);
}
