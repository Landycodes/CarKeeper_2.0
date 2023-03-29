import React, { useState } from "react";
import Nav from "./components/Nav";
import Layout from ".";
import { useRouter } from "next/router";

export default function Login() {
  //handles sign in or sign up form
  const [form, setForm] = useState(true);
  const router = useRouter();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLogin = (event) => {
    event.preventDefault();
    router.push("/home");
  };

  const handleSignUp = async (event) => {
    event.preventDefault();
    console.log(formData);
    await fetch("/api/newuser", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(formData),
    });
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
          <input id="email" type="email" required />
          <label htmlFor="password">Password</label>
          <input id="password" type="password" required />
          <button className="btn btn-success mt-2 mb-2">Sign In</button>
          <button className="btn btn-primary" onClick={() => setForm(!form)}>
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
            defaultValue={formData.username}
            required
          />
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            onChange={handleInputChange}
            defaultValue={formData.email}
            required
          />
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            onChange={handleInputChange}
            defaultValue={formData.password}
          />
          <button className="btn btn-success mt-2 mb-2">Create Account</button>
          <button className="btn btn-primary" onClick={() => setForm(!form)}>
            have an account? Login
          </button>
        </form>
      )}
    </Layout>
  );
}
