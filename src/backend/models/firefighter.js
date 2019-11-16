const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const FirefighterSchema = new mongoose.Schema(
  {
    name: String,
    code: { type: String, unique: true, index: true },
    password: { type: String },
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
    delete transformedObject.password;
  }
});

FirefighterSchema.pre("save", function(next) {
  if (!this.isModified("password")) {
    return next();
  }

  this.password = bcrypt.hashSync(this.password, 10);

  return next();
});

const Firefighter = mongoose.model("Firefighter", FirefighterSchema);

module.exports = Firefighter;
