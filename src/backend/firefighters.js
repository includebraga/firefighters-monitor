const { Firefighter } = require("./config/mongo");

exports.updateFirefighter = async (id, firefighterParams) => {
  const firefighter = await Firefighter.findOneAndUpdate(
    { _id: id },
    firefighterParams
  );

  if (!firefighter) return null;

  return exports.getFirefighters();
};

exports.getFirefighters = async () => {
  const firefighters = await Firefighter.find({});

  return JSON.parse(JSON.stringify(firefighters));
};
