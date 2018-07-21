const compression = require("compression");
const express = require("express");
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");
const firefighters = require("./firefighters");

const app = express();

app.use(bodyParser.json());

if (process.env.NODE_ENV !== "production") app.use(cors());

app.use(compression());
app.use(
  express.static(path.join(__dirname, "../../dist/"), { maxAge: 86400000 })
);

app.get("/api/firefighters", async (req, res) => {
  res.send(await firefighters.getFirefighters());
});

app.put("/api/firefighters/:id", async (req, res) => {
  const firefighterId = req.params.id;

  res.send(await firefighters.updateFirefighter(firefighterId, req.body));
});

app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "../../dist/index.html"))
);

module.exports = app;
