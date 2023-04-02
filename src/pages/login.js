import React, { useEffect, useState } from "react";
import Nav from "./components/Nav";
import Layout from ".";
import { useRouter } from "next/router";

export default function Login() {
  //next.js page routing
  const router = useRouter();

  //handles toggle for log in or sign up
  const [form, setForm] = useState(true);

  //sign up form state
  const [signUpData, setsignUpData] = useState({
    username: "",
    email: "",
    password: "",
  });

  //log in form state
  const [logInData, setLogInData] = useState({
    email: "",
    password: "",
  });

  //reset states when form changes between log in and sign up
  useEffect(() => {
    setsignUpData({
      username: "",
      email: "",
      password: "",
    });

    setLogInData({
      email: "",
      password: "",
    });
  }, [form]);

  //set state to input value
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    form
      ? setLogInData({ ...logInData, [name]: value })
      : setsignUpData({ ...signUpData, [name]: value });
    console.log(signUpData);
    console.log(logInData);
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    const signIn = await fetch("/api/signin", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(logInData),
    });
    console.log(logInData);
    if (signIn.ok) {
      router.push("/home");

      //reset log in state
      setLogInData({
        email: "",
        password: "",
      });
    } else {
      alert("Something went wrong!");
    }
  };

  const handleSignUp = async (event) => {
    event.preventDefault();

    const newUser = await fetch("/api/newuser", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(signUpData),
    });

    if (newUser.ok) {
      router.push("/home");
      //reset state once user is created
      setsignUpData({
        username: "",
        email: "",
        password: "",
      });
    } else {
      window.alert("something went wrong!");
    }
  };

  return (
    <Layout>
      <Nav title={"Welcome to CarKeeper!"} />
      {form ? (
        <form
          className="bg-dark rounded p-3 w-25 d-flex flex-column"
          onSubmit={handleLogin}
        >
          <h2 className="p-1">Login</h2>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            onChange={handleInputChange}
            defaultValue={logInData.email}
            required
          />
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            onChange={handleInputChange}
            defaultValue={logInData.password}
            required
          />
          <button className="btn btn-success mt-2 mb-2">Sign In</button>
          <button
            className="btn btn-primary"
            onClick={() => {
              setForm(!form);
              document.querySelectorAll("input").forEach((i) => (i.value = ""));
            }}
          >
            Sign up instead
          </button>
        </form>
      ) : (
        <form
          className="bg-dark rounded p-3 w-25 d-flex flex-column"
          onSubmit={handleSignUp}
        >
          <h2 className="p-1">Sign Up</h2>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            name="username"
            type="text"
            onChange={handleInputChange}
            defaultValue={signUpData.username}
            required
          />
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            onChange={handleInputChange}
            defaultValue={signUpData.email}
            required
          />
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            onChange={handleInputChange}
            defaultValue={signUpData.password}
          />
          <button className="btn btn-success mt-2 mb-2">Create Account</button>
          <button
            className="btn btn-primary"
            onClick={() => {
              setForm(!form);
              document.querySelectorAll("input").forEach((i) => (i.value = ""));
            }}
          >
            have an account? Login
          </button>
        </form>
      )}
    </Layout>
  );
}
