const { connect, Firefighter } = require("../src/backend/config/mongo");

const firefighters = [
  { name: "Jonh Doe", active: false },
  { name: "Mary Donina", active: false },
  { name: "Joaquim Alberto", active: false }
];

(async () => {
  connect();

  await Firefighter.insertMany(firefighters);

  process.exit();
})();
