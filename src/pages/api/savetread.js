import connectMongo from "../../../utils/connectDB";
import User from "@/models/User";
import Auth from "../../../utils/token";

export default async function SaveInt(req, res) {
  try {
    console.log("Connecting to database");
    await connectMongo();
    console.log("Database connected!");
    //get authentication token
    const foundUser = await Auth.authMiddleware(req);

    if (!foundUser) {
      return res.status(400).json({ message: "Unable to retrieve token" });
    }

    //find user by _id associated with token
    const updateUser = await User.findOneAndUpdate(
      { _id: foundUser._id },
      { $set: { "status.tread": req.body } }
    );

    if (!updateUser) {
      return res
        .status(400)
        .json({ message: "Cannot find a user with this id!" });
    }

    res.json(updateUser.status);
  } catch (err) {
    console.log(err.message);
    res.status(500).json(err.message);
  }
}
