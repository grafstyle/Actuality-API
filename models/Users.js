"use strict"; // Using strict.

/**
 * Schema of users.
 */
const UsersSchema = {
  email: String,
  name: String,
  url_name: String,
  img: String,
  portrait: String,
  bio: String,
  followers: Array,
  followed: Array,
  Joined: String,
};

export default UsersSchema; // Exporting schema.
