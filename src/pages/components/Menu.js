import React from "react";
import Link from "next/link";

const style = {
  hide: {
    display: "none",
  },
};

export default function Modal({ prompt, menu, toggleMenu }) {
  function changeMenu() {
    toggleMenu(!menu);
  }
  const menuItems = [
    {
      name: "Maintenance",
      link: "/Home",
    },
    {
      name: "Specifications",
      link: "/Specifications",
    },
    {
      name: "Part Status",
      link: "/Status",
    },
    {
      name: "Set Intervals",
      link: "/Intervals",
    },
  ];

  const Links = (menuItems) => {
    return (
      <li
        className={`p-1 ${
          menuItems.name === "Part Status" && prompt === "Set Intervals"
            ? ""
            : "underline"
        }`}
        style={prompt === menuItems.name ? style.hide : {}}
        key={menuItems.name}
      >
        <Link href={menuItems.link} className="text-decoration-none">
          <h3 className="link">{menuItems.name}</h3>
        </Link>
      </li>
    );
  };

  return (
    <div id="modal">
      <div id="modalContent">
        <span id="close" onClick={() => changeMenu()}>
          X
        </span>
        <h2 className="text-center font-weight-bold">MENU</h2>
        <ul className="text-center font-weight-bold list-unstyled">
          {menuItems.map((item) => Links(item))}
        </ul>
      </div>
    </div>
  );
}
