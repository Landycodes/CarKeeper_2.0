import connectMongo from "../../../utils/connectDB";
import User from "@/models/User";
import Auth from "../../../utils/token";

export default async function Me(req, res) {
  try {
    console.log("Connecting to database");
    await connectMongo();
    console.log("Database connected!");
    //get authentication token credentials
    const foundUser = await Auth.authMiddleware(req);

    if (!foundUser) {
      return res.status(400).json({ message: "Unable to retrieve token" });
    }

    //find user by _id associated with token
    const user = await User.findOne({ _id: foundUser._id });

    if (!user) {
      return res
        .status(400)
        .json({ message: "Cannot find a user with this id!" });
    }

    res.json(user);
  } catch (err) {
    console.log(err.message);
    res.status(500).json(err.message);
  }
}
