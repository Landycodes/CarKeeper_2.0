import connectMongo from "../../../utils/connectDB";
import User from "@/models/User";
const { signToken } = require("../../../utils/token");
import { auth } from "firebase-admin";

export default async function loginwithgoogle({ body }, res) {
  try {
    console.log("Connecting to database");
    await connectMongo();
    console.log("Database connected!");

    console.log("Authenticating idToken");
    const verifiedIdToken = await auth().verifyIdToken(body.idToken);
    console.log(verifiedIdToken);

    if (verifiedIdToken) {
      // find user by email
      const user = await User.findOne({ email: body.user.email });
      //validate user password
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

// export default async function newUser(req, res) {
//   try {
//     console.log("Connecting to database");
//     await connectMongo();
//     console.log("Database connected!");

//     console.log(req.body);

//     //create new user and assign a token to user
//     const newUser = await User.create(req.body);
//     if (!newUser) {
//       return res.status(400).json({ ERR: "Somethings wrong 😔" });
//     }

//     const token = signToken(newUser);
//     return res.json({ token, newUser });
//   } catch (err) {
//     if (err.code === 1100) {
//       res.status(409).json({ ERR: "Email already exists!" });
//     }
//     console.log(err.message);
//     res.status(500).json(err.message);
//   }
// }
