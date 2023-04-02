import connectMongo from "../../../utils/connectDB";
import User from "@/models/User";

export default async function newUser(req, res) {
  try {
    console.log("Connecting to database");
    await connectMongo();
    console.log("Database connected!");
  } catch (err) {
    console.log(err.message);
    res.status(500).json(err.message);
  }
}
