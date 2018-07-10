const { Firefighter } = require("./config/mongo");

exports.addActiveFirefighter = async id => {
  const firefighter = await Firefighter.findOneAndUpdate(
    { _id: id },
    { active: true }
  );

  if (!firefighter) return null;

  return exports.getFirefighters();
};

exports.removeActiveFirefighter = async id => {
  const firefighter = await Firefighter.findOneAndUpdate(
    { _id: id },
    { active: false }
  );

  if (!firefighter) return null;

  return exports.getFirefighters();
};

exports.getFirefighters = async () => {
  const firefighters = await Firefighter.find({});

  return JSON.parse(JSON.stringify(firefighters));
};
