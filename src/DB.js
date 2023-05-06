"use strict"; // Using strict.

// Import of MongoDB.
import { MongoClient } from "mongodb";

/**
 * Actual conn.
 */
let conn;

/**
 * To connect to mongo.
 * @returns database connection.
 */
export function connect() {
  conn = new MongoClient("mongodb://localhost:27017");
  return conn.db("Actuality");
}

/**
 * To close connection in mongo.
 */
export function close() {
  conn.close();
}
