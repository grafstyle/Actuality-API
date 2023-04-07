// import http from 'http'
import cors from "cors";
import express from "express";

const app = express();
const port = 3500;

export class App {
  constructor(...args) {
    if (args.length == 0) this.change();
    else {
      args.forEach((template) => {
        this.change(template);
      });
    }
  }

  change(...args) {
    let corsOpt = {
      origin: "*",
      methods: "GET, HEAD, OPTIONS , POST, PUT",
      allowedHeaders:
        "Origin, X-Requested-With, Content-Type, Accept, Authorization",
      credentials: true,
    };

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

    app.use(cors(corsOpt));
  }
}

export class Router {
  get(url, template) {
    app.get(url, (req, res) => {
      res.json(template);
    });
  }

  post(url) {
    app.post(url, (req, res) => {
      res.json(req.body);
    });
  }

  update(url) {
    app.put(url, (req, res) => {
      const { id } = req.params;
      res.json(req.body);
    });
  }

  delete(url) {
    app.delete(url, (req, res) => {
      const { id } = req.params;
      res.json({ deleted: id });
    });
  }
}
