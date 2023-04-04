import jwt from "jwt-simple";
export const secret_key = "java_best_languaje";

export function encode(json) {
  return jwt.encode(json, secret_key, "HS256");
}

export function decode(encodedJSON) {
  return jwt.decode(encodedJSON, secret_key, true);
}
