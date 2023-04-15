import React, { useEffect, useState } from "react";
import Image from "next/image";
import loadIcon from "../../../public/speedometer.gif";
import Auth from "../../../utils/auth";
import { getMe, saveMiles } from "../api";

import Nav from "../components/Nav";
import Layout from "..";

export default function Home() {
  const [name, setName] = useState("");

  const [loading, isLoading] = useState(true);

  //useState for intervals
  const [int, setInt] = useState({
    oilInt: null,
    coolInt: null,
    psInt: null,
    brakeInt: null,
    tiroInt: null,
    transInt: null,
  });

  //useState for next service values
  const [mileVal, setMiles] = useState({
    oilVal: null,
    coolVal: null,
    psVal: null,
    brakeVal: null,
    tiroVal: null,
    transVal: null,
  });

  //get user data on page render
  useEffect(() => {
    const getData = async () => {
      try {
        const token = Auth.loggedIn() ? Auth.getToken() : null;

        if (!token) {
          return false;
        }

        const data = await getMe(token);

        if (!data.ok) {
          throw new Error("something went wrong!");
        }

        const user = await data.json();
        return user;
      } catch (err) {
        console.error(err);
      }
    };
    getData().then((data) => {
      setName(data.username);

      //deconstruct data.intervals and set that to int state
      const { oilInt, coolInt, psInt, brakeInt, tiroInt, transInt } =
        data.intervals;
      setInt({
        oilInt: oilInt,
        coolInt: coolInt,
        psInt: psInt,
        brakeInt: brakeInt,
        tiroInt: tiroInt,
        transInt: transInt,
      });

      //check if milage has been set and add to mileVal
      if (data.maintenance !== null && data.maintenance !== undefined) {
        const { oilVal, coolVal, psVal, brakeVal, tiroVal, transVal } =
          data.maintenance;
        setMiles({
          oilVal: oilVal,
          coolVal: coolVal,
          psVal: psVal,
          brakeVal: brakeVal,
          tiroVal: tiroVal,
          transVal: transVal,
        });
      }
      isLoading(false);
    });
  }, []);

  const saveNextService = async (event) => {
    event.preventDefault();
    //inputbox grabs current milage input box from form
    const inputBox = event.target.children[1].children[0];
    if (inputBox.value !== "") {
      try {
        const token = Auth.loggedIn() ? Auth.getToken() : null;

        if (!token) {
          return false;
        }

        const data = await saveMiles(token, mileVal);

        if (!data.ok) {
          console.log("Couldn't save service!");
        }

        const updatedUser = await data.json();
        // POSSIBLE ALERT?
        console.log("next service saved!");
        return updatedUser;
      } catch (err) {
        console.error(err);
      }
      inputBox.value = "";
    }
  };

  //used to check if any mile value has been entered
  const hasSetMiles = (mileVal) => {
    return Object.values(mileVal).some((value) => Boolean(value));
  };

  const maintItems = [
    {
      name: "Oil Change: ",
      id: "oil",
      miles: mileVal.oilVal,
      interval: int.oilInt,
    },
    {
      name: "Coolant Flush: ",
      id: "cool",
      miles: mileVal.coolVal,
      interval: int.coolInt,
    },
    {
      name: "Power Steering: ",
      id: "ps",
      miles: mileVal.psVal,
      interval: int.psInt,
    },
    {
      name: "Brake/Clutch Fluid: ",
      id: "brake",
      miles: mileVal.brakeVal,
      interval: int.brakeInt,
    },
    {
      name: "Tire Rotation: ",
      id: "tiro",
      miles: mileVal.tiroVal,
      interval: int.tiroInt,
    },
    {
      name: "Transmission Flush: ",
      id: "trans",
      miles: mileVal.transVal,
      interval: int.transInt,
    },
  ];

  const setList = (maintItems) => {
    const nextService = maintItems.miles + maintItems.interval;
    return (
      <li key={maintItems.id}>
        {maintItems.miles ? maintItems.name : ""}
        <span className="span" id={maintItems.id}>
          {maintItems.miles ? (
            <span>
              {nextService.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              <small> Miles</small>
            </span>
          ) : (
            ""
          )}
        </span>
      </li>
    );
  };

  return (
    <Layout>
      <div className="d-flex flex-column align-items-center text-white w-100">
        <Nav title={"Maintenance"} />
        {loading ? (
          <Image
            src={loadIcon}
            width={200}
            height={200}
            alt="Loading"
            className="loadIcon"
          />
        ) : (
          <div>
            {name ? <h5>Welcome, {name}!</h5> : ""}
            <ul className="list-unstyled p-2">
              {hasSetMiles(mileVal) ? (
                maintItems.map((items) => setList(items))
              ) : (
                <h6>Please enter service</h6>
              )}
            </ul>
            <form
              id="maint-input"
              className="d-flex flex-column align-items-center"
              onSubmit={(event) => saveNextService(event)}
            >
              <label
                htmlFor="select"
                className="d-flex flex-column align-items-center font-weight-bold p-1 mb-2 w-100"
              >
                Performed
                <select name="maint-menu" id="maint-menu">
                  <option id="oilVal" value={int.oilInt}>
                    Oil Change
                  </option>
                  <option id="coolVal" value={int.coolInt}>
                    Coolant Flush
                  </option>
                  <option id="brakeVal" value={int.brakeInt}>
                    Brake/Clutch Fluid
                  </option>
                  <option id="psVal" value={int.psInt}>
                    Power Steering Flush
                  </option>
                  <option id="transVal" value={int.transInt}>
                    Transmission Flush
                  </option>
                  <option id="tiroVal" value={int.tiroInt}>
                    Tire Rotation
                  </option>
                </select>
              </label>
              <label
                htmlFor="miles"
                className="text-center font-weight-bold p-1 mb-2 w-100"
              >
                Current Mileage
                <input
                  type="number"
                  id="miles"
                  className="d-flex flex-column align-items-center shadow border-0 rounded"
                />
              </label>
              <button
                type="submit"
                className="w-50 enter mt-2 shadow text-white"
                onClick={() => {
                  //gets interval value and input miles and adds them together
                  const miles = parseInt(
                    document.getElementById("miles").value
                  );

                  //get the id of the currently selected option
                  const index = document.querySelector("select");
                  const selectedService = index.options[index.selectedIndex].id;

                  //for each option check to see if it matches the selected option
                  //and if the new value is a number
                  //set the value to the mileVal useState
                  const services = document.querySelectorAll("option");
                  services.forEach((service) => {
                    if (service.id === selectedService && miles) {
                      setMiles({ ...mileVal, [service.id]: miles });
                    }
                  });
                  //MAKE THIS AN ALERT
                  !miles ? console.log("please enter current mileage") : {};
                }}
              >
                Enter
              </button>
            </form>
          </div>
        )}
      </div>
    </Layout>
  );
}
