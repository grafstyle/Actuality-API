// All imports.
import bodyParser from "body-parser";
import cors from "cors";
import express from "express";

/**
 * This API refered of express.
 */
const app = express();

/**
 * Port of API server.
 */
const port = 3500;

/**
 * Contains all methods for creating and showing this API.
 */
export class App {
  router = app;

  /**
   * Creates an server with multiple or one "templates".
   * @param  {...String} args
   */
  constructor(...args) {
    if (args.length == 0) this.change();
    else {
      args.forEach((template) => {
        this.change(template);
      });
    }
  }

  /**
   * Change all "templates" for new "templates".
   * @param  {...String} args
   */
  change(...args) {
    let corsOpt = {
      origin: "*",
      methods: "GET, HEAD, OPTIONS, POST, PUT, DELETE",
      allowedHeaders:
        "Origin, X-Requested-With, Content-Type, Accept, Authorization",
      credentials: true,
    };

    let jsonParser = bodyParser.json({ limit: "60mb" });

    app.get("/", (req, res) => {
      if (args.length > 0) {
        args.forEach((template) => {
          res.send();
          res.send(req.body == undefined ? template : (req.body += template));
        });
      } else res.send("");
    });

    app.listen(port, () => {
      console.log("Open in http://localhost:" + port);
    });
    app.use(cors(corsOpt), jsonParser);
  }

  /**
   * Method to convert the query of the request to new parameters
   * with the respective data type.
   * @param { Request } request
   * @returns parameters of url's
   */
  static getParamsOfURL(request) {
    const newParams = {};
    Object.keys(request.query).forEach((key) => {
      if (!isNaN(request.query[key]))
        newParams[key] = parseInt(request.query[key]);
      else newParams[key] = request.query[key];
    });
    return newParams;
  }

  /**
   * POST operation, it is to post data by request.
   *
   * @param {String} url
   * @param {Function} func
   * Function to execute to add data to cloudinary or database.
   */
  postImage(url, func) {
    this.router.post(url, async (req, res) => {
      if (
        req.body.image != undefined &&
        req.body.name != undefined &&
        req.body.url != undefined
      )
        res.send(await func(req.body));
      else res.send({ error: "Image or url is missing." });
      res.end();
    });
  }

  /**
   * DELETE operation, it is to delete data by request.
   *
   * @param {String} url
   * @param {Function} func
   * Function to execute to add data to cloudinary or database.
   */
  deleteImage(url, func) {
    this.router.delete(url, async (req, res) => {
      const params = App.getParamsOfURL(req);
      if (params.url != undefined) res.send(await func(params.url));
      else res.send({ error: "Url is missing" });
      res.end();
    });
  }
}
