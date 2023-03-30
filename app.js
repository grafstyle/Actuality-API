import express from "express";

const app = express();
const port = 3500;

app.get("/", (req, res) => {
  res.send("Hello world!");
});

app.listen(port, () => {
  console.log("Open in http://localhost:" + port);
});
