import connectMongo from "../../../utils/connectDB";
import User from "@/models/User";
const { signToken } = require("../../../utils/token");

export default async function signin({ body }, res) {
  try {
    console.log("Connecting to database");
    await connectMongo();
    console.log("Database connected!");

    //find user by email
    const user = await User.findOne({ email: body.email });
    if (!user) {
      return res
        .status(400)
        .json({ ERR: "could not find an account with that email" });
    }

    //validate password
    const correctPW = await user.isCorrectPassword(body.password);
    if (!correctPW) {
      return res.status(400).json({ ERR: "Incorrect password" });
    }

    //assign token to user
    const token = signToken(user);
    res.json({ token, user });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
}
