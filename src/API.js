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
  }
}

export class Router {
  add(url, template) {
    app.get(url, (req, res) => {
      res.send(template);
    });
  }

  addJSON(url, template) {
    app.get(url, (req, res) => {
      res.json(template);
    });
  }
}
