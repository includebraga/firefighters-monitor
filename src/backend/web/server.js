const compression = require("compression");
const cors = require("cors");
const express = require("express");
const helmet = require("helmet");
const path = require("path");
const mime = require("mime-types");

const auth = require("./auth");
const firefighters = require("../repo/firefighters");
const firefightersHistory = require("../repo/history");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(compression());

if (process.env.NODE_ENV !== "production") {
  app.use(cors());
} else {
  auth.ensureBasicAuthCredentials();

  app.all("*", (req, res, next) => {
    if (req.path !== "/ping") {
      return auth.basicAuth(req, res, next);
    }

    return next();
  });
}

app.use(
  express.static(path.join(__dirname, "../../../dist/"), {
    maxAge: 8.64e8,
    // exclude HTML files from cache
    setHeaders: (res, headersPath) => {
      if (mime.lookup(headersPath) === "text/html") {
        res.setHeader("Cache-Control", "public, max-age=0");
      }
    }
  })
);

app.get("/ping", async (req, res) => {
  res.status(200).send();
});

app.get("/api/firefighters", async (req, res) => {
  res.send(await firefighters.getFirefighters());
});

app.get("/api/firefighters/:id/history", async (req, res) => {
  const firefighterId = req.params.id;

  res.send(await firefightersHistory.getHistoryOfFirefighter(firefighterId));
});

app.put("/api/firefighters/:id", async (req, res) => {
  const firefighterId = req.params.id;

  res.send(await firefighters.updateFirefighter(firefighterId, req.body));
});

app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "../../dist/index.html"))
);

module.exports = app;
