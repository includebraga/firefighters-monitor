const auth = require("basic-auth");

const { BASIC_AUTH_USERNAME, BASIC_AUTH_PASSWORD } = process.env;

const checkCredentials = user =>
  user.name === BASIC_AUTH_USERNAME && user.pass === BASIC_AUTH_PASSWORD;

const ensureBasicAuthCredentials = () => {
  if (!BASIC_AUTH_PASSWORD || !BASIC_AUTH_USERNAME) {
    throw new Error(
      "BASIC_AUTH_USERNAME and BASIC_AUTH_PASSWORD must be defined"
    );
  }
};

const basicAuth = (req, res, next) => {
  const user = auth(req);

  if (!user || !checkCredentials(user)) {
    res.set("WWW-Authenticate", 'Basic realm = "include braga"');

    return res.status(401).send();
  }

  return next();
};

module.exports = { basicAuth, ensureBasicAuthCredentials };
