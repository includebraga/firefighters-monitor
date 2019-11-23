const jwt = require("jsonwebtoken");
const { getFirefighterBycode } = require("../repo/firefighters");

const { JWT_SIGN_KEY } = process.env;

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

const jwtAuthMiddleware = async (req, res, next) => {
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
  ensureJwtKey,
  firefighterToToken,
  tokenToFirefighter,
  jwtAuthMiddleware
};
