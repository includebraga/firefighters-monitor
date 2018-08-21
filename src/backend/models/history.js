const mongoose = require("mongoose");

const HistorySchema = new mongoose.Schema(
  {
    firefighter: {
      type: mongoose.Schema.ObjectId,
      required: true,
      ref: "Firefighter"
    },
    before: Object,
    after: Object
  },
  { timestamps: true }
);

HistorySchema.set("toJSON", {
  transform: (_doc, object, _options) => {
    const transformedObject = object;

    transformedObject.id = transformedObject._id;
    delete transformedObject._id;
    delete transformedObject.__v;
  }
});

const History = mongoose.model("History", HistorySchema);

module.exports = History;
