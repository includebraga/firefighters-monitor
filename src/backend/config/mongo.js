const MONGO_URL_SWITCH = {
  production: process.env.MONGODB_URI,
  test: "mongodb://localhost:27017/ff-monitor-test",
  default: "mongodb://localhost:27017/ff-monitor-dev"
};

const MONGO_URL =
  MONGO_URL_SWITCH[process.env.NODE_ENV] || MONGO_URL_SWITCH.default;

const mongoose = require("mongoose");

exports.connect = () =>
  mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

exports.mongoose = mongoose;
