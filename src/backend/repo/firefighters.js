const { Firefighter } = require("../models");
const historyRepo = require("./history");

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
