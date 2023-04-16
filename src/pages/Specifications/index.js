import React, { useEffect, useState } from "react";
import Image from "next/image";
import loadIcon from "../../../public/speedometer.gif";
import Nav from "../components/Nav";
import Auth from "../../../utils/auth";
import Layout from "..";
import { getData } from "../../../utils/getData";
import { saveSpecifications } from "../api";

export default function Specs() {
  const [saveEdit, setButton] = useState(false);

  const [loading, isLoading] = useState(true);

  const [specs, setSpecs] = useState({
    make: "",
    model: "",
    year: "",
    vin: "",
    tire: "",
    engine: "",
  });

  useEffect(() => {
    getData().then((data) => {
      console.log(data.specifications);
      if (data.specifications === undefined) {
        setButton(true);
      } else {
        const { make, model, year, vin, tire, engine } = data.specifications;
        setSpecs({
          make: make,
          model: model,
          year: year,
          vin: vin,
          tire: tire,
          engine: engine,
        });
      }

      isLoading(false);
    });
  }, []);

  const handleInputChange = (event) => {
    const { id, value } = event.target;
    setSpecs({ ...specs, [id]: value });
  };

  const saveSpecs = async () => {
    try {
      const token = Auth.loggedIn() ? Auth.getToken() : null;

      if (!token) {
        return false;
      }

      const data = await saveSpecifications(token, specs);

      if (!data.ok) {
        console.log("Couldn't save specs!");
      }

      const updatedUser = await data.json();
      // POSSIBLE ALERT?
      console.log("specifications saved!");
      return updatedUser;
    } catch (err) {
      console.error(err);
    }
    setButton(!saveEdit);
  };

  const spec = [
    {
      id: "make",
      name: "Make",
      value: specs.make,
    },
    {
      id: "model",
      name: "Model",
      value: specs.model,
    },
    {
      id: "year",
      name: "Year",
      value: specs.year,
    },
    {
      id: "vin",
      name: "Vin",
      value: specs.vin,
    },
    {
      id: "tire",
      name: "Tire",
      value: specs.tire,
    },
    {
      id: "engine",
      name: "Engine",
      value: specs.engine,
    },
  ];

  const specItem = (spec) => {
    return (
      <li
        className="d-flex flex-column justify-content-start underline"
        key={spec.name}
      >
        <div>
          <small>{spec.name}: </small>
          <span className="ml-2" id={spec.name}>
            {spec.value}
          </span>
        </div>
        <input
          type="text"
          className={`value ${saveEdit ? "" : "d-none"}`}
          id={spec.id}
          defaultValue={spec.value}
          onChange={handleInputChange}
        />
      </li>
    );
  };
  return (
    <Layout>
      <Nav title="Specifications" />
      {loading ? (
        <Image
          src={loadIcon}
          width={200}
          height={200}
          alt="Loading"
          className="loadIcon"
        />
      ) : (
        <form
          className="d-flex flex-column align-items-center text-white spec-list"
          onSubmit={(event) => {
            event.preventDefault();

            saveEdit ? saveSpecs() : {};
            setButton(!saveEdit);
          }}
        >
          <ul className="list-unstyled p-2 w-100">
            {spec.map((item) => specItem(item))}
          </ul>
          <button
            type="submit"
            id="save-edit"
            className="enter shadow btn-dark text-white btn-outline-dark w-50"
          >
            {saveEdit ? "Save" : "Edit"}
          </button>
        </form>
      )}
    </Layout>
  );
}
