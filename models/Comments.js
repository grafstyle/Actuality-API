"use strict"; // Using strict.

/**
 * Schema of comments.
 */
const CommentSchema = {
  id: Number,
  id_user: Number,
  id_post: Number,
  comment: String,
  media: String,
  date_adding: String,
  date_modified: String,
};

export default CommentSchema; // Exporting schema.
