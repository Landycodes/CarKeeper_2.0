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

const statSchema = new Schema({
  brake: String,
  tread: String,
});
// const statSchema = new Schema({
//   fl: {
//     brake: {
//       left: String,
//       right: String,
//     },
//     tread: {
//       lOuter: String,
//       lInner: String,
//       rInner: String,
//       rOuter: String,
//     },
//   },
//   fr: {
//     brake: {
//       left: String,
//       right: String,
//     },
//     tread: {
//       lOuter: String,
//       lInner: String,
//       rInner: String,
//       rOuter: String,
//     },
//   },
//   bl: {
//     brake: {
//       left: String,
//       right: String,
//     },
//     tread: {
//       lOuter: String,
//       lInner: String,
//       rInner: String,
//       rOuter: String,
//     },
//   },
//   br: {
//     brake: {
//       left: String,
//       right: String,
//     },
//     tread: {
//       lOuter: String,
//       lInner: String,
//       rInner: String,
//       rOuter: String,
//     },
//   },
// });

module.exports = { brakeSchema, treadSchema };
