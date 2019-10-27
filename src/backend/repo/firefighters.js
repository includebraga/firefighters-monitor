const bcrypt = require("bcrypt");
const { Firefighter } = require("../models");
const historyRepo = require("./history");

exports.createFirefighter = async firefightersParams => {
  return Firefighter.create(firefightersParams);
};

exports.authenticateFirefighter = async (email, password) => {
  const firefighter = await Firefighter.findOne({ email });

  if (!firefighter) return null;

  const isAuth = await bcrypt.compare(password, firefighter.password);

  return isAuth ? firefighter : null;
};

exports.getFirefighterByEmail = async email => {
  return Firefighter.findOne({ email });
};

exports.updateFirefighter = async (id, firefighterParams) => {
  const firefighter = await Firefighter.findById(id);

  if (!firefighter) return null;

  await Firefighter.updateOne(firefighter, firefighterParams);
  const updatedFirefighter = await Firefighter.findById(id);

  historyRepo.createHistory(firefighter, updatedFirefighter);

  return exports.getFirefighters();
};

exports.getFirefighters = async () => {
  const firefighters = await Firefighter.find({});

  return JSON.parse(JSON.stringify(firefighters));
};
