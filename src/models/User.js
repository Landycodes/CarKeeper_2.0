import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";
import intervalSchema from "./interval";
import maintSchema from "./maint";
import specSchema from "./spec";

// const { Schema, model } = require("mongoose");
// const intervalSchema = require("./interval");
// const maintSchema = require("./maint");
// const bcrypt = require("bcrypt");

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+@.+\..+/, "Must use a valid email address"],
  },
  password: {
    type: String,
    required: true,
  },
  maintenance: {
    type: maintSchema,
  },
  intervals: {
    type: intervalSchema,
    default: () => ({}),
  },
  specifications: {
    type: specSchema,
  },
  status: [],
});

// hash user password
userSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified("password")) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// custom method to compare and validate password for logging in
userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

//logic to prevent multiple models
let User;

try {
  User = model("User");
} catch {
  User = model("User", userSchema);
}

export default User;
