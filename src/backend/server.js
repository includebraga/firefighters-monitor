const compression = require("compression");
const express = require("express");
const helmet = require("helmet");
const path = require("path");
const cors = require("cors");
const firefighters = require("./firefighters");

const app = express();

if (process.env.NODE_ENV !== "production") app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
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
