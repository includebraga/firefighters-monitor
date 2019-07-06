const mongoose = require("mongoose");

const FirefighterSchema = new mongoose.Schema(
  {
    name: String,
    ff_id: String,
    status: String,
    dutyType: String
  },
  { timestamps: true }
);

FirefighterSchema.set("toJSON", {
  transform: (_doc, object, _options) => {
    const transformedObject = object;

    transformedObject.id = transformedObject._id;
    delete transformedObject._id;
    delete transformedObject.__v;
  }
});

const Firefighter = mongoose.model("Firefighter", FirefighterSchema);

module.exports = Firefighter;
