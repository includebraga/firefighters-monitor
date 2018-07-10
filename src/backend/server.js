const compression = require("compression");
const express = require("express");
const path = require("path");
const cors = require("cors");
const firefighters = require("./firefighters");

const app = express();

if (process.env.NODE_ENV !== "production") app.use(cors());

app.use(compression());
app.use(
  express.static(path.join(__dirname, "../../dist/"), { maxAge: 86400000 })
);

app.get("/api/firefighters", async (req, res) => {
  res.send(await firefighters.getFirefighters());
});

app.post("/api/firefighters/active/:id", async (req, res) => {
  const firefighterId = req.params.id;

  res.send(await firefighters.addActiveFirefighter(firefighterId));
});

app.delete("/api/firefighters/active/:id", async (req, res) => {
  const firefighterId = req.params.id;

  res.send(await firefighters.removeActiveFirefighter(firefighterId));
});

app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "../../dist/index.html"))
);

module.exports = app;
