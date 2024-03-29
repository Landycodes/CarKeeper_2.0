import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";
import intervalSchema from "./interval";
import maintSchema from "./maint";
import specSchema from "./spec";
import { brakeSchema, treadSchema } from "./status";

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+@.+\..+/, "Must use a valid email address"],
  },
  password: {
    type: String,
  },
  uid: {
    type: String,
    unique: true,
    sparse: true,
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
  status: {
    brake: { type: brakeSchema },
    tread: { type: treadSchema },
  },
});

// hash user password
userSchema.pre("save", async function (next) {
  if ((this.isNew && this.password) || this.isModified("password")) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// custom method to compare and validate password for logging in
userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

//check for password or uid
userSchema.path("uid").validate(function (uid) {
  return uid || this.password;
});

//logic to prevent multiple models
let User;

try {
  User = model("User");
} catch {
  User = model("User", userSchema);
}

export default User;
