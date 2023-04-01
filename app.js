import { App, Router } from "./src/API.js";
import { get } from "./middleware/Users.js";

const app = new App();
const router = new Router();

let allDataUsers = await get();

router.addJSON("/Users", allDataUsers);
