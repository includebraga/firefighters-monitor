// eslint-disable-next-line
if (process.env.NODE_ENV !== "production") require("dotenv").config();

const compression = require("compression");
const cors = require("cors");
const express = require("express");
const helmet = require("helmet");
const path = require("path");
const mime = require("mime-types");
const bodyParser = require("body-parser");

const auth = require("./auth");
const firefighters = require("../repo/firefighters");
const firefightersHistory = require("../repo/history");

const app = express();

auth.ensureJwtKey();

app.use(bodyParser.json());
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

app.post("/api/auth", async (req, res) => {
  const { code, password } = req.body;

  const firefighter = await firefighters.authenticateFirefighter(
    code,
    password
  );

  if (firefighter) {
    const serializedFirefighter = firefighter.toJSON();

    res.send({
      ...serializedFirefighter,
      jwt: auth.firefighterToToken(firefighter)
    });
  } else {
    res.sendStatus(404);
  }
});

app.use(auth.requireAdminAuth);
// Everything below this requires AUTH

app.get("/api/admin/firefighters", async (req, res) => {
  res.send(await firefighters.getFirefighters());
});

app.post("/api/admin/firefighters", async (req, res) => {
  const { name, code, password } = req.body;

  res.send(await firefighters.createFirefighter({ name, code, password }));
});

app.put("/api/admin/firefighters/:id", async (req, res) => {
  const firefighterId = req.params.id;

  res.send(await firefighters.updateFirefighter(firefighterId, req.body));
});

app.get("/api/admin/firefighters/:id/history", async (req, res) => {
  const firefighterId = req.params.id;

  res.send(await firefightersHistory.getHistoryOfFirefighter(firefighterId));
});

app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "../../dist/index.html"))
);

module.exports = app;
