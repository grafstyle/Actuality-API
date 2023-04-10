// Import of jwt simple.
import jwt from "jwt-simple";

/**
 * Secret key.
 */
export const secret_key = "java_best_languaje";

/**
 * Encode data with HS256.
 * @param {JSON} json
 * @returns JSON Web Token.
 */
export function encode(json) {
  return jwt.encode(json, secret_key, "HS256");
}

/**
 * Decode data with HS256.
 * @param {String} encodedJSON
 * @returns JSON Web Token.
 */
export function decode(encodedJSON) {
  return jwt.decode(encodedJSON, secret_key, true);
}
