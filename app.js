import { App, Router } from "./src/API.js";
import { decode } from "./middleware/auth.js";
import {
  addUser,
  deleteUser,
  getUsers,
  updateUser,
} from "./controller/Users.js";

const app = new App();
const router = new Router();

let allDataUsers = decode(await getUsers());

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

router.get("/Users", allDataUsers);
router.post("/Users", addUser);
