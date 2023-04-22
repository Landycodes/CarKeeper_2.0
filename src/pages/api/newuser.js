import connectMongo from "../../../utils/connectDB";
import User from "@/models/User";
const { signToken } = require("../../../utils/token");

export default async function newUser(req, res) {
  try {
    console.log("Connecting to database");
    await connectMongo();
    console.log("Database connected!");

    //create new user and assign a token to user
    const newUser = await User.create(req.body);
    if (!newUser) {
      res.status(400).json({ ERR: "Somethings wrong 😔" });
    }
    const token = signToken(newUser);
    res.json({ token, newUser });
  } catch (err) {
    console.log(err.message);
    res.status(500).json(err.message);
  }
}
