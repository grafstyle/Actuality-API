"use strict";

export const UsersSchema = {
  email: String,
  name: String,
  url_name: String,
  img: Blob,
  portrait: Blob,
  bio: String,
  followers: Array,
  followed: Array,
  Joined: String,
};
