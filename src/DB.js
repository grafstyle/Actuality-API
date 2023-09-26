"use strict"; // Using strict.

// All imports
import { MongoClient } from "mongodb";
import * as dotenv from "dotenv";

/**
 * To connect to mongo.
 * @returns database connection.
 */
export function connect() {
  dotenv.config();

  return new MongoClient(process.env.DB_CONNECTION).db();
}
