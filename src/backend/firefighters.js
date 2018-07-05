const firefighters = {
  1: { name: "Jonh Doe", active: false },
  2: { name: "Mary Donina", active: false },
  3: { name: "Joaquim Alberto", active: false }
};

exports.addActiveFirefighter = id => {
  const firefighter = firefighters[id];

  if (!firefighter) return null;

  firefighter.active = true;

  return exports.getFirefighters();
};

exports.removeActiveFirefighter = id => {
  const firefighter = firefighters[id];

  if (!firefighter) return null;

  firefighter.active = false;

  return exports.getFirefighters();
};

exports.getFirefighters = () => Object.values(firefighters);

exports.resetFirefighters = () =>
  Object.keys(firefighters).forEach(id => exports.removeActiveFirefighter(id));
