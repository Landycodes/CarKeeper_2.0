const { Schema } = require("mongoose");

const maintSchema = new Schema({
  oilVal: Number,
  coolVal: Number,
  psVal: Number,
  brakeVal: Number,
  tiroVal: Number,
  transVal: Number,
});

module.exports = maintSchema;
