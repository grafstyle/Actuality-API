import { App, Router } from "./src/API.js";
import { decode } from "./middleware/auth.js";
import { getOneUser, getUsers } from "./controller/Users.js";

const app = new App();
const router = new Router();

let allDataUsers = decode(await getUsers());

router.addJSON("/Users", allDataUsers);
