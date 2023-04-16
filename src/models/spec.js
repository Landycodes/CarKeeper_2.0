const { Schema } = require("mongoose");

const specSchema = new Schema({
  make: String,
  model: String,
  year: String,
  vin: String,
  tire: String,
  engine: String,
});

module.exports = specSchema;
