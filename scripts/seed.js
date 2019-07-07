const { connect } = require("../src/backend/config/mongo");
const { Firefighter } = require("../src/backend/models");

const firefightersNumbers = [
  5,
  7,
  11,
  18,
  19,
  23,
  25,
  28,
  33,
  34,
  37,
  38,
  39,
  41,
  43,
  54,
  56,
  59,
  60,
  63,
  65,
  66,
  67,
  70,
  71,
  73,
  75,
  78,
  79,
  80,
  91,
  93,
  97,
  100,
  102,
  106,
  110,
  111,
  113,
  114,
  120,
  121,
  122,
  126
];

const firefightersList = firefightersNumbers.map(number => ({
  name: number.toString(),
  status: "inactive",
  dutyType: "none"
}));

const firefightersCommand = [
  { name: "Cmdt", status: "inactive", dutyType: "none" },
  { name: "2º Cmdt", status: "inactive", dutyType: "none" },
  { name: "Adj", status: "inactive", dutyType: "none" }
];

(async () => {
  connect();

  await Firefighter.insertMany([...firefightersCommand, ...firefightersList]);

  process.exit();
})();
