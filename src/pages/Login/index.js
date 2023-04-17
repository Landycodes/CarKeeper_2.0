import React, { useEffect, useState } from "react";
import Image from "next/image";
import loadIcon from "../../../public/speedometer.gif";
import Nav from "../components/Nav";
import Layout from "..";
import { useRouter } from "next/router";
import { signIn, signUp } from "../api/index";
import Auth from "../../../utils/auth";

export default function Login() {
  //next.js page routing
  const router = useRouter();
  //handles toggle for log in or sign up
  const [form, setForm] = useState(true);

  const [loading, isLoading] = useState(false);

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
    // console.log(signUpData);
    // console.log(logInData);
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    isLoading(true);

    //../pages/api/signin
    try {
      //send fetch request and retrieve user token to log in
      const entryPlz = await signIn(logInData);
      // console.log(logInData);
      // console.log({ token, user });
      if (entryPlz.ok) {
        const { token } = await entryPlz.json();
        Auth.login(token);
        router.push("/Home");

        //reset log in state
        setLogInData({
          email: "",
          password: "",
        });
      }
    } catch (err) {
      console.error(err);
      isLoading(false);
    }
  };

  const handleSignUp = async (event) => {
    event.preventDefault();
    // console.log(signUpData);
    isLoading(true);
    try {
      //../pages/api/newuser
      const newUser = await signUp(signUpData);

      if (newUser.ok) {
        const { token, user } = await newUser.json();
        // console.log({ token, user });
        Auth.login(token);
        router.push("/Home");

        //reset state once user is created
        setsignUpData({
          username: "",
          email: "",
          password: "",
        });
      }
    } catch (err) {
      console.error(err);
      isLoading(false);
    }
  };

  return (
    <Layout>
      <Nav title={"Welcome to CarKeeper!"} />
      {form ? (
        loading ? (
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
          <form
            className="entryForm rounded p-3 d-flex flex-column text-white"
            onSubmit={handleLogin}
          >
            <h2 className="p-1">Login</h2>
            <label htmlFor="email" className="d-flex flex-column">
              Email
              <input
                id="email"
                className="login"
                name="email"
                type="email"
                onChange={handleInputChange}
                defaultValue={logInData.email}
                required
              />
            </label>
            <label htmlFor="password" className="d-flex flex-column">
              Password
              <input
                id="password"
                className="login"
                name="password"
                type="password"
                onChange={handleInputChange}
                defaultValue={logInData.password}
                required
              />
            </label>
            <button className="btn btn-success mt-2 mb-2">Sign In</button>
            <button
              className="btn btn-primary"
              onClick={() => {
                setForm(!form);
                document
                  .querySelectorAll("input")
                  .forEach((i) => (i.value = ""));
              }}
            >
              Sign up instead
            </button>
          </form>
        )
      ) : loading ? (
        <div>
          <Image
            src={loadIcon}
            width={200}
            height={200}
            alt="Loading"
            className="loadIcon"
          />
          <h1 className="text-center">Welcome!</h1>
        </div>
      ) : (
        <form
          className="entryForm rounded p-3 d-flex flex-column"
          onSubmit={handleSignUp}
        >
          <h2 className="p-1">Sign Up</h2>
          <label htmlFor="username" className="d-flex flex-column">
            Username
            <input
              id="username"
              className="login"
              name="username"
              type="text"
              onChange={handleInputChange}
              defaultValue={signUpData.username}
              required
            />
          </label>
          <label htmlFor="email" className="d-flex flex-column">
            Email
            <input
              id="email"
              className="login"
              name="email"
              type="email"
              onChange={handleInputChange}
              defaultValue={signUpData.email}
              required
            />
          </label>
          <label htmlFor="password" className="d-flex flex-column">
            Password
            <input
              id="password"
              className="login"
              name="password"
              type="password"
              onChange={handleInputChange}
              defaultValue={signUpData.password}
            />
          </label>
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
