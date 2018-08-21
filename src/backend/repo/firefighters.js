const { Firefighter } = require("../models");
const historyRepo = require("./history");

exports.updateFirefighter = async (id, firefighterParams) => {
  const firefighter = await Firefighter.findOneAndUpdate(
    { _id: id },
    firefighterParams
  );

  if (!firefighter) return null;

  historyRepo.createHistory(firefighter, firefighterParams);

  return exports.getFirefighters();
};

exports.getFirefighters = async () => {
  const firefighters = await Firefighter.find({});

  return JSON.parse(JSON.stringify(firefighters));
};
