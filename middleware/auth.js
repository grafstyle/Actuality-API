import * as decode from "jwt-simple";
import moment from "moment/moment.js";
const secret = "como_obtuviste_el_texto";

export default function getSecretKey(req, res, next) {
  if (res.status(200)) res.status(200).send("hola");
  if (!req.headers.authorization)
    return res
      .status(403)
      .send({ message: "The request don't have a autentication header" });
  else {
    let token = req.headers.authorization.replace(/['"]+/g, "");
    let payload = decode(token, secret);
    try {
      if (payload.exp > moment().unix())
        return res.status(401).send({ message: "The token was expired" });
    } catch (e) {
      return res.status(404).send({ message: "The token is not valid" });
    }
    req.user = payload;
    next();
  }
}
