import React, { useEffect, useState } from "react";
import Image from "next/image";
import loadIcon from "../../../public/speedometer.gif";
import Nav from "../components/Nav";
import Auth from "../../../utils/auth";
import Layout from "..";

import { saveInterval } from "../api";
import { getData } from "../../../utils/getData";

export default function Interval() {
  //show or hide button based on input change
  const [button, setButton] = useState(false);

  const [loading, isLoading] = useState(true);

  //create interval state
  const [intervals, setIntervals] = useState({
    oilInt: "",
    coolInt: "",
    psInt: "",
    brakeInt: "",
    tiroInt: "",
    transInt: "",
  });

  useEffect(() => {
    getData().then((data) => {
      //get interval values from user DB
      setIntervals(data.intervals);
      isLoading(false);
    });
  }, []);

  //name is the service interval is being applied to
  // id and value are a key value pairs for intervals state
  const maintItems = [
    {
      name: "Oil change",
      id: "oilInt",
      value: intervals.oilInt,
    },
    {
      name: "Coolant flush",
      id: "coolInt",
      value: intervals.coolInt,
    },
    {
      name: "Power Steering flush",
      id: "psInt",
      value: intervals.psInt,
    },
    {
      name: "Brake/Clutch fluid change",
      id: "brakeInt",
      value: intervals.brakeInt,
    },
    {
      name: "Tire rotation",
      id: "tiroInt",
      value: intervals.tiroInt,
    },
    {
      name: "Transmission flush",
      id: "transInt",
      value: intervals.transInt,
    },
  ];

  const setList = (menuItems) => {
    return (
      <li className="p-1" key={menuItems.name}>
        <small>
          {menuItems.name} every
          <input
            id={menuItems.id}
            className="interval"
            type="number"
            defaultValue={menuItems.value}
            onChange={(event) => {
              setButton(true);
              const { id, value } = event.target;
              setIntervals({ ...intervals, [id]: parseInt(value) });
            }}
          />
          miles.
        </small>
      </li>
    );
  };
  return (
    <Layout>
      <Nav title="Set Intervals" />
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
        <div className="d-flex flex-column align-items-center text-white">
          <ul className="list-unstyled p-2">
            {maintItems.map((items) => setList(items))}
          </ul>
          <button
            type="button"
            id="save-int"
            className={`enter ${button ? "" : "d-none"}`}
            onClick={async () => {
              try {
                const token = Auth.loggedIn() ? Auth.getToken() : null;

                if (!token) {
                  return false;
                }

                const data = await saveInterval(token, intervals);

                if (!data.ok) {
                  console.log("Couldn't save intervals!");
                }

                const updatedUser = await data.json();
                // console.log(updatedUser);
                setButton(false);
                //MAKE THIS AN ALERT
                console.log("intervals have been updated!");

                return updatedUser;
              } catch (err) {
                console.error(err);
              }
            }}
          >
            Save
          </button>
        </div>
      )}
    </Layout>
  );
}
