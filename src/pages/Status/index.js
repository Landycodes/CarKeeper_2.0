import React, { useState, useEffect } from "react";
import Image from "next/image";
import loadIcon from "../../../public/speedometer.gif";
import Nav from "../components/Nav";
import Layout from "..";
import { getData } from "../../../utils/getData";

export default function Status() {
  //true = brake false = tread
  const [toggle, setToggle] = useState(true);

  const [loading, isLoading] = useState(true);

  const [saveEdit, setButton] = useState(false);

  useEffect(() => {
    getData().then((data) => {
      console.log(data);
      isLoading(false);
    });
  }, []);

  const valueInput = () => {
    return toggle ? (
      <div className={`d-flex w-100 ${saveEdit ? "" : "d-none"}`}>
        <input className="mb-1 w-50 rounded brake-val" />
        <input className="mb-1 w-50 rounded brake-val" />
      </div>
    ) : (
      <div className={`d-flex ${saveEdit ? "" : "d-none"}`}>
        <input className="p-1 mb-1 w-25 rounded tread-val" />
        <input className="p-1 mb-1 w-25 rounded tread-val" />
        <input className="p-1 mb-1 w-25 rounded tread-val" />
        <input className="p-1 mb-1 w-25 rounded tread-val" />
      </div>
    );
  };

  const measurements = () => {
    return (
      <h5 className="m-0 mt-2 mb-2">
        <span></span>
        <br></br>
        <small className="measurement">{toggle ? "MM" : "/32nds"}</small>
      </h5>
    );
  };

  return (
    <Layout>
      <Nav title="Part Status" />
      {loading ? (
        <div>
          <Image
            src={loadIcon}
            width={200}
            height={200}
            alt="Loading"
            className="loadIcon"
          />
          <h1 className="text-center">Loading...</h1>
        </div>
      ) : (
        <div className="w-100 d-flex flex-column justify-content-center align-items-center">
          {/* toggle bar */}
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
              className={`slider select ${
                toggle ? "slide-left" : "slide-right"
              }`}
            ></span>
          </label>

          <input
            id="toggle"
            type="checkbox"
            className="d-none"
            onClick={() => {
              setToggle(!toggle);
              setButton(false);
            }}
          />
          <div
            id="status-container"
            className="text-white text-center d-flex flex-column justify-content-around"
          >
            <div className="w-100 h-25 mt-2 d-flex justify-content-between front">
              <div className="w-25">
                <label>
                  <h1 className="p-2">FL</h1>
                </label>
                <div className="d-flex flex-column align-items-center">
                  {measurements()}
                  {valueInput()}
                </div>
              </div>
              <div className="w-25">
                <label>
                  <h1 className="p-2">FR</h1>
                </label>
                <div className="d-flex flex-column align-items-center">
                  {measurements()}
                  {valueInput()}
                </div>
              </div>
            </div>
            <div className="m-0 w-100 h-25 d-flex align-items-center justify-content-center">
              <button
                id="edit-stat"
                className="enter text-white"
                onClick={() => setButton(!saveEdit)}
              >
                {saveEdit ? "Save" : "Edit"}
              </button>
            </div>
            <div className="w-100 h-25 mb-2 d-flex justify-content-between align-items-end">
              <div className="w-25">
                <div className="d-flex flex-column align-items-center">
                  {valueInput()}
                  {measurements()}
                </div>
                <label>
                  <h1 className="p-2">BL</h1>
                </label>
              </div>
              <div className="w-25">
                <div className="d-flex flex-column align-items-center">
                  {valueInput()}
                  {measurements()}
                </div>
                <label>
                  <h1 className="p-2">BR</h1>
                </label>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
