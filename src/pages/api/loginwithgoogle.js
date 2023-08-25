import connectMongo from "../../../utils/connectDB";
import User from "@/models/User";
const { signToken } = require("../../../utils/token");
import { auth, apps } from "firebase-admin";
import { applicationDefault, initializeApp } from "firebase-admin/app";

export default async function loginwithgoogle({ body }, res) {
  try {
    console.log("Connecting to database");
    await connectMongo();
    console.log("Database connected!");

    //initialize firebase if it doesnt already exist
    if (!apps.length) {
      initializeApp({
        credential: applicationDefault(),
        projectId: "carkeeper-auth-6ab78",
      });
    }

    console.log("Authenticating idToken");
    const verifiedIdToken = await auth().verifyIdToken(body.idToken);
    // console.log(verifiedIdToken);

    if (verifiedIdToken) {
      // find user by email
      const user = await User.findOne({ email: body.user.email });
      //possibly add another criteria to find user like uid?
      if (user) {
        console.log("account found!");

        const token = signToken(user);
        return res.json({ token, user });
      }

      //If there isnt a user then create one
      if (!user) {
        console.log("creating user!");
        // console.log(body);
        const newUser = await User.create(body.user);
        const token = signToken(newUser);
        return res.json({ token, newUser });
      }
    } else {
      return res.status(400).json({ ERR: "Token not verified" });
    }

    return;
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
}
