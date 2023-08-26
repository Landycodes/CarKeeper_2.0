import connectMongo from "../../../utils/connectDB";
import User from "@/models/User";
const { signToken } = require("../../../utils/token");

export default async function newUser(req, res) {
  try {
    console.log("Connecting to database");
    await connectMongo();
    console.log("Database connected!");

    console.log(req.body);

    //create new user and assign a token to user
    const newUser = await User.create(req.body);
    // console.log(newUser);
    if (!newUser) {
      return res.status(400).json({ ERR: "Somethings wrong 😔" });
    }

    const token = signToken(newUser);
    return res.json({ token, newUser });
  } catch (err) {
    if (err.code === 11000) {
      console.log(err.message);
      res.status(409).json({ ERR: "Email already exists!" });
      return;
    }
    console.log(err.message);
    res.status(500).json(err.message);
  }
}
