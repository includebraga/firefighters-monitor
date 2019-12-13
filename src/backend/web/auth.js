const auth = require("basic-auth");
const jwt = require("jsonwebtoken");
const { getFirefighterBycode } = require("../repo/firefighters");

const { BASIC_AUTH_USERNAME, BASIC_AUTH_PASSWORD, JWT_SIGN_KEY } = process.env;

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

const ensureJwtKey = () => {
  if (!JWT_SIGN_KEY) {
    throw new Error("JWT_SIGN_KEY should be defined");
  }
};

const firefighterToToken = firefighter => {
  const token = jwt.sign({ code: firefighter.code }, JWT_SIGN_KEY, {
    expiresIn: Math.floor(Date.now() / 1000) + 60 * 60
  });

  return `Bearer ${token}`;
};

const tokenToFirefighter = async token => {
  try {
    const tokenWithoutPrefix = /^Bearer (.+?)$/.exec(token)[1];
    const { code } = jwt.verify(tokenWithoutPrefix, JWT_SIGN_KEY);

    if (!code) return null;

    return getFirefighterBycode(code);
  } catch (error) {
    return null;
  }
};

const requireAuth = async (req, res, next) => {
  const authorizationHeader = req.get("Authorization");
  const firefighter = await tokenToFirefighter(authorizationHeader);

  if (!firefighter) {
    res.sendStatus(401);

    return;
  }

  req.currentUser = firefighter;

  next();
};

module.exports = {
  basicAuth,
  ensureBasicAuthCredentials,
  ensureJwtKey,
  firefighterToToken,
  tokenToFirefighter,
  requireAuth
};
