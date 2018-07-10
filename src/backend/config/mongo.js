const MONGO_URL_SWITCH = {
  production: process.env.MONGODB_URI,
  test: "mongodb://localhost/ff-monitor-test",
  default: "mongodb://localhost/ff-monitor-dev"
};

const MONGO_URL =
  MONGO_URL_SWITCH[process.env.NODE_ENV] || MONGO_URL_SWITCH.default;

const mongoose = require("mongoose");

const FirefighterSchema = new mongoose.Schema({
  name: String,
  ff_id: String,
  active: Boolean
});

FirefighterSchema.set("toJSON", {
  transform: (_doc, object, _options) => {
    const transformedObject = object;

    transformedObject.id = transformedObject._id;
    delete transformedObject._id;
    delete transformedObject.__v;
  }
});

// Documents
exports.Firefighter = mongoose.model("Firefighter", FirefighterSchema);

exports.connect = () => mongoose.connect(MONGO_URL);

exports.mongoose = mongoose;
