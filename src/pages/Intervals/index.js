import React from "react";
import Nav from "../components/Nav";

export default function Interval() {
  return (
    <div>
      <Nav title="Set Intervals" />
      <div className="d-flex flex-column align-items-center text-white">
        <ul className="list-unstyled p-2 ">
          <li className="p-1">
            <small>
              Oil change every
              <input id="oil-int" className="interval" type="number" />
              miles.
            </small>
          </li>
          <li className="p-1">
            <small>
              Coolant flush every
              <input id="coolant-int" className="interval" type="number" />
              miles.
            </small>
          </li>
          <li className="p-1">
            <small>
              Power steering flush every
              <input id="ps-int" className="interval" type="number" />
              miles.
            </small>
          </li>
          <li className="p-1">
            <small>
              Brake/Clutch fluid exchange every
              <input id="brake-int" className="interval" type="number" />
              miles.
            </small>
          </li>
          <li className="p-1">
            <small>
              Tire rotation every
              <input id="tiro-int" className="interval" type="number" />
              miles.
            </small>
          </li>
          <li className="p-1">
            <small>
              Transmission flush every
              <input id="trans-int" className="interval" type="number" />
              miles.
            </small>
          </li>
        </ul>
        <button
          type="button"
          id="save-int"
          className="enter btn shadow btn-dark text-white btn-outline-dark"
        >
          Save
        </button>
      </div>
    </div>
  );
}
