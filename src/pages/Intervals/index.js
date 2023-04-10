import React, { useEffect, useState } from "react";
import Nav from "../components/Nav";
import Auth from "../../../utils/auth";
import { getMe, saveInterval } from "../api";
import Layout from "..";

export default function Interval() {
  //show or hide button based on input change
  const [button, setButton] = useState(false);

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
      //default intervals if none have been set 'wont be saved unless button clicked'
      // if (!data.intervals) {
      //   setIntervals({
      //     oilInt: 4000,
      //     coolInt: 16000,
      //     psInt: 30000,
      //     brakeInt: 30000,
      //     tiroInt: 7000,
      //     transInt: 45000,
      //   });
      // } else {
      setIntervals(data.intervals);
      // }
      // console.log(data.intervals);
    });
  }, []);

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
    </Layout>
  );
}
