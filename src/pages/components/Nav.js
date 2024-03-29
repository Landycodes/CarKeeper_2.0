import React, { useState } from "react";
import Image from "next/image";
import Auth from "../../../utils/auth";
import Modal from "./Menu";
import { getAuth, signOut } from "firebase/auth";

export default function Nav({ title }) {
  const [menu, setMenu] = useState(false);

  function toggleMenu(menVal) {
    setMenu(menVal);
  }

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
          <h5
            className="logout text-nowrap"
            onClick={() => {
              const auth = getAuth();
              signOut(auth)
                .catch((error) => {
                  console.log("Couldn't log out from firebase");
                  console.log(error)
                });
                Auth.logout();
            }}
          >
            Log Out
          </h5>
          <h1>{title}</h1>
          <Image
            className="menu"
            src="/menu_icon.png"
            alt="menu"
            width={100}
            height={100}
            onClick={() => {
              setMenu(!menu);
            }}
          />
        </nav>
        {menu ? (
          <Modal prompt={title} menu={menu} toggleMenu={toggleMenu} />
        ) : (
          ""
        )}
      </div>
    );
  }
}
