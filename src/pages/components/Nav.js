import React from "react";
import Image from "next/image";
import Auth from "../../../utils/auth";
import { useRouter } from "next/router";

export default function Nav({ title }) {
  const router = useRouter();
  if (title === "Welcome to CarKeeper!") {
    return (
      <div className="w-100 text-light mb-3 text-center">
        <nav className="d-flex justify-content-around align-items-center">
          <h1>{title}</h1>
        </nav>
      </div>
    );
  } else {
    return (
      <div className="w-100 text-light mb-3 text-center">
        <nav className="d-flex justify-content-around align-items-center">
          <h5 className="logout" onClick={() => Auth.logout()}>
            Log Out
          </h5>
          <h1>{title}</h1>
          <Image
            className="menu"
            src="/menu_icon.png"
            alt="menu"
            width={100}
            height={100}
          />
        </nav>
      </div>
    );
  }
}
