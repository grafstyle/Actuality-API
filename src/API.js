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
      methods: "GET, HEAD, OPTIONS , POST, PUT",
      allowedHeaders:
        "Origin, X-Requested-With, Content-Type, Accept, Authorization",
      credentials: true,
    };

    let jsonParser = bodyParser.json();

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
}
/**
 * Contains the methods for url operations.
 */
export class Router {
  /**
   * GET operation, it is for get data by request.
   * @param {String} url
   * @param {String} template
   */
  get(url, template) {
    app.get(url, (req, res) => {
      res.json(template);
      res.end();
    });
  }

  /**
   * POST operation, it is to post data by request.
   *
   * @param {String} url
   * @param {Function} func
   * Function to execute to add data in database.
   */
  post(url, func) {
    app.post(url, (req, res) => {
      func(req.body);
      res.end();
    });
  }

  /**
   * PUT operation, it is to update data by request.
   * @param {String} url
   * @param {Number} id
   * Id to update.
   * @param {Function} func
   * Function to execute to add data in database.
   */
  update(url, id, func) {
    app.put(url, (req, res) => {
      func(id, req.body);
      res.end();
    });
  }

  /**
   * DELETE operation, it is to delete data by request.
   *
   * @param {String} url
   * @param {Number} id
   * * Id to update.
   * @param {Function} func
   * Function to execute to add data in database.
   */
  delete(url, id, func) {
    app.delete(url, (req, res) => {
      func(id);
      res.end();
    });
  }
}
