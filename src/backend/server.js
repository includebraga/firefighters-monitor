const compression = require("compression");
const express = require("express");
const path = require("path");

const app = express();

app.use(compression());
app.use(
  express.static(path.join(__dirname, "../../dist/"), { maxAge: 86400000 })
);

app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "../../dist/index.html"))
);

module.exports = app;
