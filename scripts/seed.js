const { connect, Firefighter } = require("../src/backend/config/mongo");

const firefightersNumbers = [
  5,
  7,
  10,
  11,
  18,
  19,
  23,
  25,
  28,
  33,
  34,
  36,
  37,
  38,
  39,
  41,
  42,
  43,
  45,
  46,
  51,
  54,
  56,
  57,
  60,
  62,
  63,
  65,
  66,
  67,
  68,
  70,
  71,
  73,
  75,
  76,
  78,
  79,
  80,
  91,
  93,
  97,
  98,
  99,
  100,
  102,
  106,
  109,
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
  status: "inactive"
}));

const firefightersCommand = [
  { name: "Cmdt", status: "inactive" },
  { name: "2º Cmdt", status: "inactive" },
  { name: "Adj", status: "inactive" }
];

(async () => {
  connect();

  await Firefighter.insertMany([...firefightersCommand, ...firefightersList]);

  process.exit();
})();
