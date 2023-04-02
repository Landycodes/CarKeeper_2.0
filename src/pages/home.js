import React from "react";

import Nav from "./components/Nav";

export default function Home() {
  fetch("/api/signin", {});
  return (
    <div className="d-flex flex-column align-items-center text-white">
      <Nav title={"Maintenance"} />
      <h5>Welcome</h5>
      <ul className="list-unstyled p-2">
        <li>
          Oil Change: <span className="span" id="oil"></span>
        </li>
        <li>
          Coolant Flush: <span className="span" id="coolant"></span>
        </li>
        <li>
          Power Steering: <span className="span" id="ps"></span>
        </li>
        <li>
          Brake/Clutch Fluid: <span className="span" id="brake"></span>
        </li>
        <li>
          Tire Rotation: <span className="span" id="tiro"></span>
        </li>
        <li>
          Transmission Flush: <span className="span" id="trans"></span>
        </li>
      </ul>
      <form id="maint-input" className="d-flex flex-column align-items-center">
        <label
          htmlFor="select"
          className="text-center font-weight-bold p-1 w-100"
        >
          Performed
        </label>
        <select name="maint-menu" id="maint-menu">
          <option value="oil">Oil Change</option>
          <option value="coolant">Coolant Flush</option>
          <option value="brake">Brake/Clutch Fluid</option>
          <option value="ps">Power Steering Flush</option>
          <option value="trans">Transmission Flush</option>
          <option value="tiro">Tire Rotation</option>
        </select>
        <br></br>
        <label
          htmlFor="miles"
          className="text-center font-weight-bold p-1 w-100"
        >
          Current Mileage
        </label>
        <input type="number" id="miles" className="shadow border-0" />
        <br></br>
        <button
          type="submit"
          className="w-50 enter btn shadow btn-dark text-white btn-outline-dark"
        >
          Enter
        </button>
      </form>
    </div>
  );
}
