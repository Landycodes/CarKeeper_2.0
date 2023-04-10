const { Schema } = require("mongoose");

const intervalSchema = new Schema({
  oilInt: {
    type: Number,
    default: 4000,
  },
  coolInt: {
    type: Number,
    default: 16000,
  },
  psInt: {
    type: Number,
    default: 30000,
  },
  brakeInt: {
    type: Number,
    default: 30000,
  },
  tiroInt: {
    type: Number,
    default: 8000,
  },
  transInt: {
    type: Number,
    default: 45000,
  },
});

// const intervalObject = new Schema({
//   intervals: {
//     type: intervalSchema,
//   },
// });

module.exports = intervalSchema;
