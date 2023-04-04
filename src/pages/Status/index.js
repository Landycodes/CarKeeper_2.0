import React from "react";
import Nav from "../components/Nav";

export default function Status() {
  return (
    <div>
      <Nav title="Part Status" />
      <div class="w-100 d-flex flex-column justify-content-center align-items-center">
        <label
          id="t-bar"
          class="position-relative text-white d-flex justify-content-between align-items-center m-0 pt-1 pb-1"
          for="toggle"
        >
          <h4 id="tread" class="m-0 ml-2">
            Tread
          </h4>
          <h4 id="brake" class="m-0 mr-2">
            Brake
          </h4>
          <span class="slider"></span>
        </label>
        <input id="toggle" type="checkbox" class="d-none" />
        <div
          id="status-container"
          class="text-white text-center d-flex flex-column justify-content-around"
        >
          <div class="w-100 h-25 mt-2 d-flex justify-content-between">
            <div class="w-25">
              <label>
                <h1 class="p-2">FL</h1>
              </label>
              <h5>
                <span id="FL"></span>
                <br />
                <small class="measurement"></small>
              </h5>
              <div id="FL-tread" class="d-flex">
                <input class="p-1 mb-1 w-25 rounded tread-val" />
                <input class="p-1 mb-1 w-25 rounded tread-val" />
                <input class="p-1 mb-1 w-25 rounded tread-val" />
                <input class="p-1 mb-1 w-25 rounded tread-val" />
              </div>
              <div id="FL-brake" class="d-flex w-100">
                <input class="mb-1 w-50 rounded brake-val" />
                <input class="mb-1 w-50 rounded brake-val" />
              </div>
            </div>
            <div class="w-25">
              <label>
                <h1 class="p-2">FR</h1>
              </label>
              <h5>
                <span id="FR"></span>
                <br />
                <small class="measurement"></small>
              </h5>
              <div id="FR-tread" class="d-flex">
                <input class="p-1 mb-1 w-25 rounded tread-val" />
                <input class="p-1 mb-1 w-25 rounded tread-val" />
                <input class="p-1 mb-1 w-25 rounded tread-val" />
                <input class="p-1 mb-1 w-25 rounded tread-val" />
              </div>
              <div id="FR-brake" class="d-flex w-100">
                <input class="mb-1 w-50 rounded brake-val" />
                <input class="mb-1 w-50 rounded brake-val" />
              </div>
            </div>
          </div>
          <div class="m-0 w-100 h-25 d-flex align-items-center justify-content-center">
            <button id="edit-stat" class="btn enter text-white">
              Edit
            </button>
          </div>
          <div class="w-100 h-25 mb-2 d-flex justify-content-between align-items-end">
            <div class="w-25">
              <div id="BL-brake" class="d-flex w-100">
                <input class="mb-1 w-50 rounded brake-val" />
                <input class="mb-1 w-50 rounded brake-val" />
              </div>
              <div id="BL-tread" class="d-flex">
                <input class="p-1 mb-1 w-25 rounded tread-val" />
                <input class="p-1 mb-1 w-25 rounded tread-val" />
                <input class="p-1 mb-1 w-25 rounded tread-val" />
                <input class="p-1 mb-1 w-25 rounded tread-val" />
              </div>
              <h5>
                <span id="BL"></span>
                <br />
                <small class="measurement"></small>
              </h5>
              <label class="mt-1">
                <h1 class="p-2">BL</h1>
              </label>
            </div>
            <div class="w-25">
              <div id="BR-brake" class="d-flex w-100">
                <input class="mb-1 w-50 rounded brake-val" />
                <input class="mb-1 w-50 rounded brake-val" />
              </div>
              <div id="BR-tread" class="d-flex">
                <input class="p-1 mb-1 w-25 rounded tread-val" />
                <input class="p-1 mb-1 w-25 rounded tread-val" />
                <input class="p-1 mb-1 w-25 rounded tread-val" />
                <input class="p-1 mb-1 w-25 rounded tread-val" />
              </div>{" "}
              <h5>
                <span id="BR"></span>
                <br />
                <small class="measurement"></small>
              </h5>
              <label class="mt-1">
                <h1 class="p-2">BR</h1>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
