import connectMongo from "../../../utils/connectDB";
import User from "@/models/User";

export default async function newUser(req, res) {
  try {
    console.log("Connecting to database");
    await connectMongo();
    console.log("Database connected!");

    await User.create(req.body)
      .then((data) => res.json(data))
      .catch((err) => res.status(500).json(err));
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
}
