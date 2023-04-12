const { Schema } = require("mongoose");

const maintSchema = new Schema({
  oilVal: String,
  coolVal: String,
  psVal: String,
  brakeVal: String,
  tiroVal: String,
  transVal: String,
});

module.exports = maintSchema;
