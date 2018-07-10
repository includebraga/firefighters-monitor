const { connect, mongoose } = require("../src/backend/config/mongo");

(async () => {
  await connect();

  await mongoose.connection.db.dropDatabase();

  process.exit();
})();
