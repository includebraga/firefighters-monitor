const bcrypt = require("bcrypt");
const { Firefighter } = require("../models");
const historyRepo = require("./history");

exports.createFirefighter = async firefightersParams => {
  return Firefighter.create(firefightersParams);
};

exports.authenticateFirefighter = async (code, password) => {
  const firefighter = await Firefighter.findOne({ code });

  if (!firefighter) return null;

  const isAuth = await bcrypt.compare(password, firefighter.password);

  return isAuth ? firefighter : null;
};

exports.getFirefighterBycode = async code => {
  return Firefighter.findOne({ code });
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
