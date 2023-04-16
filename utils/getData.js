import Auth from "./auth";
import { getMe } from "@/pages/api";

//gets user data to be rendered on page
export const getData = async () => {
  try {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    const data = await getMe(token);

    if (!data.ok) {
      throw new Error("something went wrong!");
    }

    const user = await data.json();
    return user;
    // console.log(user);
  } catch (err) {
    console.error(err);
  }
};
