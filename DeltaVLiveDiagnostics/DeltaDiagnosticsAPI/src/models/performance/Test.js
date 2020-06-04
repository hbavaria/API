const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SettingsSchema = Schema({
  numIterations: {
    type: Number,
    default: 1
  },
  iterationDelay: {
    type: Number,
    default: 0
  },
  testDelay: {
    type: Number,
    default: 0
  }
});

const TestSchema = Schema({
  settings: SettingsSchema,
  displayName: String,
  parameterDtos: [{ path: String }]
});

module.exports = mongoose.model("Test", TestSchema);
