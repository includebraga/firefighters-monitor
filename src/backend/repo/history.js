const { History } = require("../models");
const historyCalculator = require("./historyCalculator");

exports.createHistory = async (oldFirefighter, newFirefighter) => {
  const oldParams = JSON.parse(JSON.stringify(oldFirefighter));
  const newParams = JSON.parse(JSON.stringify(newFirefighter));
  const history = new History({
    firefighter: oldFirefighter,
    before: oldParams,
    after: newParams
  });

  await history.save();

  return history;
};

exports.getHistoryOfFirefighter = async firefighterId => {
  const history = await History.find({ firefighter: firefighterId });

  return historyCalculator.getElapsedTimes(history);
};
