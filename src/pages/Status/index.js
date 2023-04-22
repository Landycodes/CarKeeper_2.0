import React, { useState, useEffect } from "react";
import Image from "next/image";
import loadIcon from "../../../public/speedometer.gif";
import Nav from "../components/Nav";
import Layout from "..";
import Auth from "../../../utils/auth";
import { getData } from "../../../utils/getData";
import { saveBrakes, saveTread } from "../api";

export default function Status() {
  //true = brake false = tread
  const [toggle, setToggle] = useState(true);

  const [loading, isLoading] = useState(true);

  const [saveEdit, setButton] = useState(false);

  //holds brake input values
  const [brake, setBrake] = useState({
    fl: { left: "", right: "" },
    fr: { left: "", right: "" },
    bl: { left: "", right: "" },
    br: { left: "", right: "" },
  });

  //holds tread input values
  const [tread, setTread] = useState({
    fl: {
      lOuter: "",
      lInner: "",
      rInner: "",
      rOuter: "",
    },
    fr: {
      lOuter: "",
      lInner: "",
      rInner: "",
      rOuter: "",
    },
    bl: {
      lOuter: "",
      lInner: "",
      rInner: "",
      rOuter: "",
    },
    br: {
      lOuter: "",
      lInner: "",
      rInner: "",
      rOuter: "",
    },
  });

  //get and set brake and tread data on page load
  useEffect(() => {
    getData().then((data) => {
      const { brake: savedBrake, tread: savedTread } = data.status;
      const setBrakeData = { ...savedBrake };
      const setTreadData = { ...savedTread };
      setBrake({ ...setBrakeData });
      setTread({ ...setTreadData });

      isLoading(false);
    });
  }, []);

  //set brake value equal to input value
  const handleBrakeChange = (event, place) => {
    const { name, value } = event.target;
    name === "left" ? (place.left = value) : (place.right = value);
    setBrake({ ...brake, [place]: place.left || place.right });
  };

  //set tread value equal to input value
  const handleTreadChange = (event, place) => {
    const { name, value } = event.target;
    switch (name) {
      case "lOuter":
        place.lOuter = value;
        break;
      case "lInner":
        place.lInner = value;
        break;
      case "rInner":
        place.rInner = value;
        break;
      default:
        place.rOuter = value;
    }
    setTread({
      ...tread,
      [place]: place.lOuter || place.lInner || place.rInner || place.rOuter,
    });
  };

  //save values to database
  const saveInput = async () => {
    if (saveEdit) {
      try {
        const token = Auth.loggedIn() ? Auth.getToken() : null;

        if (!token) {
          return false;
        }
        const data = toggle
          ? await saveBrakes(token, brake)
          : await saveTread(token, tread);

        if (!data.ok) {
          toggle
            ? console.log("Couldn't save brakes!")
            : console.log("Couldn't save tread!");
        }

        const updatedUser = await data.json();
        // POSSIBLE ALERT?
        toggle ? console.log("Brakes saved!") : console.log("Tread saved!");
        return updatedUser;
      } catch (err) {
        console.error(err);
      }
    }
  };

  //displays input fields
  const valueInput = (place) => {
    return toggle ? (
      <div
        className={`d-flex w-100 ${saveEdit ? "" : "d-none"}`}
        onChange={(event) => handleBrakeChange(event, place)}
      >
        <input className="mb-1 w-50 rounded brake-val" name="left" />
        <input className="mb-1 w-50 rounded brake-val" name="right" />
      </div>
    ) : (
      <div
        className={`d-flex ${saveEdit ? "" : "d-none"}`}
        onChange={(event) => handleTreadChange(event, place)}
      >
        <input className="p-1 mb-1 w-25 rounded tread-val" name="lOuter" />
        <input className="p-1 mb-1 w-25 rounded tread-val" name="lInner" />
        <input className="p-1 mb-1 w-25 rounded tread-val" name="rInner" />
        <input className="p-1 mb-1 w-25 rounded tread-val" name="rOuter" />
      </div>
    );
  };

  //displays saved values
  const measurements = (value) => {
    console.log(Object.values(value).some((value) => Boolean(value)));
    return (
      <h5 className="m-0 mt-2 mb-2">
        <span>
          {toggle
            ? `${value.left}|${value.right}`
            : `${value.lOuter}|${value.lInner}|${value.rInner}|${value.rOuter}`}
        </span>
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
                  {toggle ? measurements(brake.fl) : measurements(tread.fl)}
                  {toggle ? valueInput(brake.fl) : valueInput(tread.fl)}
                </div>
              </div>
              <div className="w-25">
                <label>
                  <h1 className="p-2">FR</h1>
                </label>
                <div className="d-flex flex-column align-items-center">
                  {toggle ? measurements(brake.fr) : measurements(tread.fr)}
                  {toggle ? valueInput(brake.fr) : valueInput(tread.fr)}
                </div>
              </div>
            </div>
            {/* Save Button */}
            <div className="m-0 w-100 h-25 d-flex align-items-center justify-content-center">
              <button
                id="edit-stat"
                className="enter text-white"
                onClick={async () => {
                  await saveInput();
                  document
                    .querySelectorAll("input")
                    .forEach((i) => (i.value = ""));

                  setButton(!saveEdit);
                }}
              >
                {saveEdit ? "Save" : "Edit"}
              </button>
            </div>
            <div className="w-100 h-25 mb-2 d-flex justify-content-between align-items-end">
              <div className="w-25">
                <div className="d-flex flex-column align-items-center">
                  {toggle ? valueInput(brake.bl) : valueInput(tread.bl)}
                  {toggle ? measurements(brake.bl) : measurements(tread.bl)}
                </div>
                <label>
                  <h1 className="p-2">BL</h1>
                </label>
              </div>
              <div className="w-25">
                <div className="d-flex flex-column align-items-center">
                  {toggle ? valueInput(brake.br) : valueInput(tread.br)}
                  {toggle ? measurements(brake.br) : measurements(tread.br)}
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
