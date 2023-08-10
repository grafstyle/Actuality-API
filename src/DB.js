"use strict"; // Using strict.

// Import of MongoDB.
import { MongoClient } from "mongodb";

/**
 * To connect to mongo.
 * @returns database connection.
 */
export function connect() {
  return new MongoClient(
    "mongodb+srv://root:XUmRpTzNpm4ZcZMS@actualitycluster.3eyco0v.mongodb.net/Actuality?retryWrites=true&w=majority"
  ).db();
}
