"use strict"; // Using strict.

/**
 * Schema of users.
 */
const UsersSchema = {
  id: 0,
  email: "",
  name: "",
  url_name: "",
  img: "",
  portrait: "",
  bio: "",
  followers: [""],
  followed: [""],
  Joined: "",
};

export default UsersSchema; // Exporting schema.
