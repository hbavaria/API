const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const IterationSchema = Schema({
  _id: Schema.Types.ObjectId,
  iterationNumber: {
    type: Number
  },
  subscribeElapsed: {
    type: Number,
    default: 0
  },
  getJsonElapsed: {
    type: Number,
    default: 0
  },
  parseJsonElapsed: {
    type: Number,
    default: 0
  },
  displayJsonSize: {
    type: String,
    default: "0"
  },
  animationScriptSize: {
    type: String,
    default: "0"
  },
  eventScriptSize: {
    type: String,
    default: "0"
  },
  startDate: {
    type: Date,
    default: Date.now()
  },
  endDate: {
    type: Date,
    default: Date.now()
  },
  parameterErrors: [
    {
      paramPath: String,
      timestamp: Number,
      errorMessage: String,
      status: Number,
      paramType: String,
      subStatus: Number
    }
  ],
  displayErrors: [
    { displayName: String, errorMessage: String, errorCode: Number }
  ]
});

const ResultSchema = Schema({
  _id: Schema.Types.ObjectId,
  testId: { type: Schema.Types.ObjectId, ref: "Test" },
  lowSubscribeElapsed: {
    type: Number,
    default: 0
  },
  highSubscribeElapsed: {
    type: Number,
    default: 0
  },
  avgSubscribeElapsed: {
    type: Number,
    default: 0
  },
  avgGetJsonElapsed: {
    type: Number,
    default: 0
  },
  avgParseJsonElapsed: {
    type: Number,
    default: 0
  },
  startDate: {
    type: Date,
    default: Date.now()
  },
  endDate: {
    type: Date,
    default: Date.now()
  },
  iterations: [IterationSchema]
});

module.exports = mongoose.model("Result", ResultSchema);
