"use strict"; // Using strict.

// Import of MongoDB.
import { MongoClient } from "mongodb";

/**
 * To connect to mongo.
 * @returns database connection.
 */
export function connect() {
  return new MongoClient(
    "mongodb://osmaldym:1234@localhost:27017/Actuality?authSource=admin"
  ).db();
}
