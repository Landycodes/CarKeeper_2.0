const { Schema } = require("mongoose");

const brakeSchema = new Schema({
  fl: {
    left: String,
    right: String,
  },
  fr: {
    left: String,
    right: String,
  },
  bl: {
    left: String,
    right: String,
  },
  br: {
    left: String,
    right: String,
  },
});

const treadSchema = new Schema({
  fl: {
    lOuter: String,
    lInner: String,
    rInner: String,
    rOuter: String,
  },
  fr: {
    lOuter: String,
    lInner: String,
    rInner: String,
    rOuter: String,
  },
  bl: {
    lOuter: String,
    lInner: String,
    rInner: String,
    rOuter: String,
  },
  br: {
    lOuter: String,
    lInner: String,
    rInner: String,
    rOuter: String,
  },
});

module.exports = { brakeSchema, treadSchema };
