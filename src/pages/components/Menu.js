import React, { useState } from "react";

const style = {
  hide: {
    display: "none",
  },
};

export default function Modal({ prompt, menu, toggleMenu }) {
  function changeMenu() {
    toggleMenu(!menu);
  }
  return (
    <div id="modal">
      <div id="modalContent">
        <span id="close" onClick={() => changeMenu()}>
          X
        </span>
        <h2 className="text-center font-weight-bold">MENU</h2>
        <ul className="text-center font-weight-bold list-unstyled">
          <li
            className="p-1"
            style={prompt === "Maintenance" ? style.hide : {}}
          >
            <a href="../index.html">
              <h3>Maintenance</h3>
            </a>
          </li>
          <li
            className="p-1"
            style={prompt === "Specifications" ? style.hide : {}}
          >
            <a href="./pages/specs.html">
              <h3>Specifications</h3>
            </a>
          </li>
          <li className="p-1" style={prompt === "Status" ? style.hide : {}}>
            <a href="./pages/status.html">
              <h3>Part Status</h3>
            </a>
          </li>
          <li
            className="p-1"
            style={prompt === "Set Interval" ? style.hide : {}}
          >
            <a href="./pages/interval.html">
              <h3>Set Intervals</h3>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
