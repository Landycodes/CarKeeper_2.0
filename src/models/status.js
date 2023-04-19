const { Schema } = require("mongoose");

const statSchema = new Schema({
  fl: {
    brake: {
      type: [String],
    },
    tread: {
      type: [String],
    },
  },
  fr: {
    brake: {
      type: [String],
    },
    tread: {
      type: [String],
    },
  },
  bl: {
    brake: {
      type: [String],
    },
    tread: {
      type: [String],
    },
  },
  br: {
    brake: {
      type: [String],
    },
    tread: {
      type: [String],
    },
  },
});

module.exports = statSchema;
