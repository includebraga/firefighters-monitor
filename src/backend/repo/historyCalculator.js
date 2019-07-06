// Date difference in minutes
function dateDiff(before, after) {
  const diff = Math.abs(new Date(before) - new Date(after));

  return Math.floor(diff / 1000 / 60);
}

function getElapsedTimesOfState(eventState, timeElapsed, { activeTime }) {
  if (eventState.status === "active") {
    return { activeTime: activeTime + timeElapsed };
  }

  return { activeTime };
}

function getElaspedTimesEventList(history, times) {
  let newTimes = times;

  history.forEach(event => {
    const timeElapsed = dateDiff(event.before.updatedAt, event.after.updatedAt);

    newTimes = getElapsedTimesOfState(event.before, timeElapsed, times);
  });

  return newTimes;
}

function getElapsedTimesLastEvent(history, times) {
  const lastEvent = history[history.length - 1];
  const timeElapsed = dateDiff(lastEvent.after.updatedAt, new Date());

  return getElapsedTimesOfState(lastEvent.after, timeElapsed, times);
}

exports.getElapsedTimes = history => {
  let times = {
    activeTime: 0
  };

  times = getElaspedTimesEventList(history, times);
  times = getElapsedTimesLastEvent(history, times);

  return times;
};
