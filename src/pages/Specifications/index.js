import React from "react";
import Nav from "../components/Nav";
import Layout from "..";

export default function Specs() {
  const spec = [
    {
      value: "make-val",
      name: "Make",
    },
    {
      value: "model-val",
      name: "Model",
    },
    {
      value: "year-val",
      name: "Year",
    },
    {
      value: "vin-val",
      name: "Vin",
    },
    {
      value: "tire-val",
      name: "Tire",
    },
    {
      value: "engine-val",
      name: "Engine",
    },
  ];

  const specItem = (spec) => {
    return (
      <li class="spec underline">
        <small>{spec.name}: </small>
        <span class="ml-2" id={spec.name}></span>
        <input type="text" class="value" id={spec.value} />
      </li>
    );
  };
  return (
    <Layout>
      <Nav title="Specifications" />
      <div class="d-flex flex-column align-items-center text-white">
        <ul class="list-unstyled p-2 spec-list">
          {spec.map((item) => specItem(item))}
          {/* <li class="spec">
                <small>Make: </small>
                <span class="ml-2" id="make"></span>
                <input type="text" class="value" id="make-val">
            </li>
            <li class="spec">
                <small>Model: </small>
                <span class="ml-2" id="model"></span>
                <input type="text" class="value" id="model-val">
            </li>
            <li class="spec">
                <small>Year: </small>
                <span class="ml-2" id="year"></span>
                <input type="text" class="value" id="year-val">
            </li>
            <li class="spec">
                <small>VIN: </small>
                <span class="ml-2" id="vin"></span>
                <input type="text" class="value" id="vin-val">
            </li>
            <li class="spec">
                <small>Tire size: </small>
                <span class="ml-2" id="tire"></span>
                <input type="text" class="value" id="tire-val">
            </li>
            <li class="spec">
                <small>Engine: </small>
                <span class="ml-2" id="engine"></span>
                <input type="text" class="value" id="engine-val">
            </li> */}
        </ul>
        <button
          type="button"
          id="save-edit"
          class="enter btn shadow btn-dark text-white btn-outline-dark"
        >
          Edit
        </button>
      </div>
    </Layout>
  );
}
