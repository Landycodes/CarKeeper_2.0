import React, { useState } from "react";
import Nav from "../components/Nav";
import Layout from "..";

export default function Status() {
  //true = brake false = tread
  const [toggle, setToggle] = useState(true);

  return (
    <Layout>
      <Nav title="Part Status" />
      <div className="w-100 d-flex flex-column justify-content-center align-items-center">
        <label
          id="t-bar"
          className="d-flex justify-content-between align-items-center m-0 p-0"
          htmlFor="toggle"
        >
          <h4 id="tread" className="p-1">
            Tread
          </h4>
          <h4 id="brake" className="p-1">
            Brake
          </h4>
          <span
            className={`slider select ${toggle ? "slide-left" : "slide-right"}`}
          ></span>
        </label>

        <input
          id="toggle"
          type="checkbox"
          className="d-none"
          onClick={() => {
            setToggle(!toggle);
          }}
        />
        <div
          id="status-container"
          className="text-white text-center d-flex flex-column justify-content-around"
        >
          <div className="w-100 h-25 mt-2 d-flex justify-content-between">
            <div className="w-25">
              <label>
                <h1 className="p-2">FL</h1>
              </label>
              <h5 className="m-0 mt-2">
                <span id="FL"></span>
                <br></br>
                <small className="measurement"></small>
              </h5>
              <div id="FL-tread" className="d-flex">
                <input className="p-1 mb-1 w-25 rounded tread-val" />
                <input className="p-1 mb-1 w-25 rounded tread-val" />
                <input className="p-1 mb-1 w-25 rounded tread-val" />
                <input className="p-1 mb-1 w-25 rounded tread-val" />
              </div>
              <div id="FL-brake" className="d-flex w-100">
                <input className="mb-1 w-50 rounded brake-val" />
                <input className="mb-1 w-50 rounded brake-val" />
              </div>
            </div>
            <div className="w-25">
              <label>
                <h1 className="p-2">FR</h1>
              </label>
              <h5 className="m-0 mt-2">
                <span id="FR"></span>
                <br />
                <small className="measurement"></small>
              </h5>
              <div id="FR-tread" className="d-flex">
                <input className="p-1 mb-1 w-25 rounded tread-val" />
                <input className="p-1 mb-1 w-25 rounded tread-val" />
                <input className="p-1 mb-1 w-25 rounded tread-val" />
                <input className="p-1 mb-1 w-25 rounded tread-val" />
              </div>
              <div id="FR-brake" className="d-flex w-100">
                <input className="mb-1 w-50 rounded brake-val" />
                <input className="mb-1 w-50 rounded brake-val" />
              </div>
            </div>
          </div>
          <div className="m-0 w-100 h-25 d-flex align-items-center justify-content-center">
            <button id="edit-stat" className="enter text-white">
              Edit
            </button>
          </div>
          <div className="w-100 h-25 mb-2 d-flex justify-content-between align-items-end">
            <div className="w-25">
              <div id="BL-brake" className="d-flex w-100">
                <input className="mb-1 w-50 rounded brake-val" />
                <input className="mb-1 w-50 rounded brake-val" />
              </div>
              <div id="BL-tread" className="d-flex">
                <input className="p-1 mb-1 w-25 rounded tread-val" />
                <input className="p-1 mb-1 w-25 rounded tread-val" />
                <input className="p-1 mb-1 w-25 rounded tread-val" />
                <input className="p-1 mb-1 w-25 rounded tread-val" />
              </div>
              <h5>
                <span id="BL"></span>
                <br />
                <small className="measurement"></small>
              </h5>
              <label>
                <h1 className="p-2">BL</h1>
              </label>
            </div>
            <div className="w-25">
              <div id="BR-brake" className="d-flex w-100">
                <input className="mb-1 w-50 rounded brake-val" />
                <input className="mb-1 w-50 rounded brake-val" />
              </div>
              <div id="BR-tread" className="d-flex">
                <input className="p-1 mb-1 w-25 rounded tread-val" />
                <input className="p-1 mb-1 w-25 rounded tread-val" />
                <input className="p-1 mb-1 w-25 rounded tread-val" />
                <input className="p-1 mb-1 w-25 rounded tread-val" />
              </div>
              <h5>
                <span id="BR"></span>
                <br />
                <small className="measurement"></small>
              </h5>
              <label>
                <h1 className="p-2">BR</h1>
              </label>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
