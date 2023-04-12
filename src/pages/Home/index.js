import React, { useEffect, useState } from "react";
import Auth from "../../../utils/auth";
import { getMe, saveMaint } from "../api";

import Nav from "../components/Nav";
import Layout from "..";

export default function Home() {
  const [name, setName] = useState("");

  //useState for intervals
  const [int, setInt] = useState({
    oilInt: "",
    coolInt: "",
    psInt: "",
    brakeInt: "",
    tiroInt: "",
    transInt: "",
  });

  //useState for next service values
  const [serviceVal, setService] = useState({
    oilVal: "",
    coolVal: "",
    psVal: "",
    brakeVal: "",
    tiroVal: "",
    transVal: "",
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
        // console.log(user);
      } catch (err) {
        console.error(err);
      }
    };
    getData().then((data) => {
      setName(data.username);

      console.log(data.maintenance);
      if (data.maintenance) {
        const { oilVal, coolVal, psVal, brakeVal, tiroVal, transVal } =
          data.maintenance;
        setService({
          oilVal: oilVal,
          coolVal: coolVal,
          psVal: psVal,
          brakeVal: brakeVal,
          tiroVal: tiroVal,
          transVal: transVal,
        });
      }
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
    });
  }, []);

  const saveNextService = async (event) => {
    event.preventDefault();
    const inputBox = event.target.children[1].children[0];
    if (inputBox.value !== "") {
      try {
        const token = Auth.loggedIn() ? Auth.getToken() : null;

        if (!token) {
          return false;
        }

        const data = await saveMaint(token, serviceVal);

        if (!data.ok) {
          console.log("Couldn't save intervals!");
        }

        const updatedUser = await data.json();
        // console.log(updatedUser);
        console.log("next service saved!");
        inputBox.value = "";
        return updatedUser;
      } catch (err) {
        console.error(err);
      }
    }
  };

  const maintItems = [
    {
      name: "Oil Change: ",
      id: "oil",
      value: serviceVal.oilVal,
    },
    {
      name: "Coolant Flush: ",
      id: "cool",
      value: serviceVal.coolVal,
    },
    {
      name: "Power Steering: ",
      id: "ps",
      value: serviceVal.psVal,
    },
    {
      name: "Brake/Clutch Fluid: ",
      id: "brake",
      value: serviceVal.brakeVal,
    },
    {
      name: "Tire Rotation: ",
      id: "tiro",
      value: serviceVal.tiroVal,
    },
    {
      name: "Transmission Flush: ",
      id: "trans",
      value: serviceVal.transVal,
    },
  ];

  const setList = (maintItems) => {
    return (
      <li key={maintItems.id}>
        {maintItems.value ? maintItems.name : ""}
        <span className="span" id={maintItems.id}>
          {maintItems.value}
          {maintItems.value ? <small> Miles</small> : ""}
        </span>
      </li>
    );
  };

  return (
    <Layout>
      <div className="d-flex flex-column align-items-center text-white w-100">
        <Nav title={"Maintenance"} />
        {name ? <h5>Welcome, {name}!</h5> : ""}
        <ul className="list-unstyled p-2">
          {maintItems.map((items) => setList(items))}
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
          <br></br>
          <button
            type="submit"
            className="w-50 enter shadow text-white"
            onClick={() => {
              //gets interval value and input miles and adds them together
              const interval = parseInt(document.querySelector("select").value);
              const miles = parseInt(document.getElementById("miles").value);
              const nextService = interval + miles;

              //get the id of the currently selected option
              const index = document.querySelector("select");
              const selectedService = index.options[index.selectedIndex].id;

              //for each option check to see if it matches the selected option
              //and if the new value is a number
              //set the value to the serviceVal useState
              const services = document.querySelectorAll("option");
              services.forEach((service) => {
                if (service.id === selectedService && nextService) {
                  const newVal = nextService
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                  setService({ ...serviceVal, [service.id]: newVal });
                }
              });
              //MAKE THIS AN ALERT
              !nextService ? console.log("please enter current milage") : {};
              // document.getElementById("miles").value = "";
            }}
          >
            Enter
          </button>
        </form>
      </div>
    </Layout>
  );
}
