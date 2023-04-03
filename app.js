import { App, Router } from "./src/API.js";
import getSecretKey from "./middleware/auth.js"
import { getUser } from "./controller/Users.js";

const app = new App();
const router = new Router();

let allDataUsers = await getUser();

router.addJSON("/Users", getSecretKey, allDataUsers);
