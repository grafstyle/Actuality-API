import { App, Router } from "./src/API.js";
import { decode } from "./middleware/auth.js";
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

const app = new App();
const router = new Router();

let allDataUsers = decode(await getUsers());
let allDataPosts = decode(await getPosts());
let allDataComments = decode(await getComments());

allDataUsers.forEach((elem) => {
  Object.keys(elem).forEach((key) => {
    if (key == "id") {
      let withIdUrl = "/Users/" + elem["id"];
      router.get(withIdUrl, elem);
      router.update(withIdUrl, elem["id"], updateUser);
      router.delete(withIdUrl, elem["id"], deleteUser);
    }
  });
});

allDataPosts.forEach((elem) => {
  Object.keys(elem).forEach((key) => {
    if (key == "id") {
      let withIdUrl = "/Posts/" + elem["id"];
      router.get(withIdUrl, elem);
      router.update(withIdUrl, elem["id"], updatePost);
      router.delete(withIdUrl, elem["id"], deletePost);
    }
  });
});

allDataComments.forEach((elem) => {
  Object.keys(elem).forEach((key) => {
    if (key == "id") {
      let withIdUrl = "/Comments/" + elem["id"];
      router.get(withIdUrl, elem);
      router.update(withIdUrl, elem["id"], updateComment);
      router.delete(withIdUrl, elem["id"], deleteComment);
    }
  });
});

router.get("/Users", allDataUsers);
router.post("/Users", addUser);

router.get("/Posts", allDataPosts);
router.post("/Posts", addPost);

router.get("/Comments", allDataComments);
router.post("/Comments", addComment);
