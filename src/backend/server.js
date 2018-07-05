const compression = require("compression");
const express = require("express");
const path = require("path");
const firefighters = require("./firefighters");

const app = express();

app.use(compression());
app.use(
  express.static(path.join(__dirname, "../../dist/"), { maxAge: 86400000 })
);

app.get("/api/firefighters", (req, res) => {
  res.send(firefighters.getFirefighters());
});

app.post("/api/firefighters/active/:id", (req, res) => {
  const firefighterId = req.params.id;

  firefighters.addActiveFirefighter(firefighterId);

  res.send(firefighters.getFirefighters());
});

app.delete("/api/firefighters/active/:id", (req, res) => {
  const firefighterId = req.params.id;

  firefighters.removeActiveFirefighter(firefighterId);

  res.send(firefighters.getFirefighters());
});

app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "../../dist/index.html"))
);

module.exports = app;
