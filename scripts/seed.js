const { connect, Firefighter } = require("../src/backend/config/mongo");

const firefighters = [
  { name: "Jonh Doe", status: "inactive" },
  { name: "Mary Donina", status: "inactive" },
  { name: "Joaquim Alberto", status: "inactive" }
];

(async () => {
  connect();

  await Firefighter.insertMany(firefighters);

  process.exit();
})();
