const { History } = require("../models");

exports.createHistory = async (firefighter, newParams) => {
  const oldParams = JSON.parse(JSON.stringify(firefighter));
  const history = new History({
    firefighter,
    before: oldParams,
    after: { ...oldParams, ...newParams }
  });

  await history.save();

  return history;
};

exports.getHistoryOfFirefighter = async firefighter => {
  const history = await History.find({ firefighter });

  return JSON.parse(JSON.stringify(history));
};
