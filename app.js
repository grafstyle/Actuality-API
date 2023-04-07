import { App, Router } from "./src/API.js";
import { decode } from "./middleware/auth.js";
import { getUsers } from "./controller/Users.js";

const app = new App();
const router = new Router();

let allDataUsers = decode(await getUsers());

allDataUsers.forEach((elem) => {
  Object.keys(elem).forEach((key) => {
    if (key == "id") router.get("/Users/" + elem[key], elem);
  });
});

router.get("/Users", allDataUsers);
