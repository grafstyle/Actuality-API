"use strict";

import { MongoClient } from "mongodb";

let conn;

export function connect() {
  conn = new MongoClient("mongodb://localhost:27017");
  return conn.db("Actuality");
}

export function close() {
  conn.close();
}
