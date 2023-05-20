// All imports.
import { App } from "./src/API.js";
import {
  addUser,
  deleteUser,
  getUsers,
  updateUser,
} from "./controller/Users.js";
import {
  addPost,
  deletePost,
  getPosts,
  updatePost,
} from "./controller/Posts.js";
import {
  addComment,
  deleteComment,
  getComments,
  updateComment,
} from "./controller/Comments.js";
import {
  addLike,
  deleteLike,
  getLikes,
  updateLike,
} from "./controller/Likes.js";
import * as cloudinary from "./controller/Cloudinary.js";

const app = new App();

// Adding the url's of get's and post of users.
app.router.get("/users", async (req, res) => {
  res.send(await getUsers());
  res.end();
});

app.router.get("/users/get", async (req, res) => {
  res.send(await getUsers(App.getParamsOfURL(req)));
  res.end();
});

app.router.post("/users", (req, res) => {
  addUser(req.body);
  res.end();
});

app.router.put("/users/put", async (req, res) => {
  res.send(await updateUser(App.getParamsOfURL(req)));
  res.end();
});

app.router.delete("/users/delete", async (req, res) => {
  const id = App.getParamsOfURL(req).id;
  console.log(id);
  if (id != undefined) res.send(await deleteUser(id));
  else res.send('Please type variable "id" in the url, with valid "id"');
  res.end();
});

// Adding the url's of get's and post of posts.
app.router.get("/posts", async (req, res) => {
  res.send(await getPosts());
  res.end();
});

app.router.get("/posts/get", async (req, res) => {
  res.send(await getPosts(App.getParamsOfURL(req)));
  res.end();
});

app.router.post("/posts", (req, res) => {
  addPost(req.body);
  res.end();
});

app.router.put("/posts/put", async (req, res) => {
  res.send(await updatePost(App.getParamsOfURL(req)));
  res.end();
});

app.router.delete("/posts/delete", async (req, res) => {
  const id = App.getParamsOfURL(req).id;
  if (id != undefined) res.send(await deletePost(id));
  else res.send('Please type variable "id" in the url, with valid "id"');
  res.end();
});

// Adding the url's of get's and post of comments.
app.router.get("/comments", async (req, res) => {
  res.send(await getComments());
  res.end();
});

app.router.get("/comments/get", async (req, res) => {
  res.send(await getComments(App.getParamsOfURL(req)));
  res.end();
});

app.router.post("/comments", (req, res) => {
  addComment(req.body);
  res.end();
});

app.router.put("/comments/put", async (req, res) => {
  res.send(await updateComment(App.getParamsOfURL(req)));
  res.end();
});

app.router.delete("/comments/delete", async (req, res) => {
  const id = App.getParamsOfURL(req).id;
  if (id != undefined) res.send(await deleteComment(id));
  else res.send('Please type variable "id" in the url, with valid "id"');
  res.end();
});

// Adding the url's of get's and post of likes.
app.router.get("/likes", async (req, res) => {
  res.send(await getLikes());
  res.end();
});

app.router.get("/likes/get", async (req, res) => {
  res.send(await getLikes(App.getParamsOfURL(req)));
  res.end();
});

app.router.post("/likes", (req, res) => {
  addLike(req.body);
  res.end();
});

app.router.put("/likes/put", async (req, res) => {
  res.send(await updateLike(App.getParamsOfURL(req)));
  res.end();
});

app.router.delete("/likes/delete", async (req, res) => {
  const id = App.getParamsOfURL(req).id;
  if (id != undefined) res.send(await deleteLike(id));
  else res.send('Please type variable "id" in the url, with valid "id"');
  res.end();
});

// Adding the url's to post of cloudinary and config it.
cloudinary.config();
app.postImage("/new/file", cloudinary.addImage);
app.deleteImage("/delete/file", cloudinary.deleteImage);
