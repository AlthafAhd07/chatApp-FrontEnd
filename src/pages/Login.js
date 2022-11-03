import React, { useContext, useEffect, useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import { postAPI } from "../utils/fetchData";

import "../styles/auth/auth.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("logged") === "true") {
      navigate("/");
    }
  }, []);
  async function handleSubmit(e) {
    e.preventDefault();
    if (email.length < 1 || password.length < 1) {
      return;
    }
    try {
      const res = await postAPI("login", { account: email, password });

      localStorage.setItem("logged", "true");
      navigate("/");
    } catch (error) {
      console.log(error.response.data);
    }
  }

  return (
    <div className="auth">
      <div className="auth__wrapper">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            placeholder="althafahd07@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="Password">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Login</button>
        </form>
        <div className="bottom__stuff">
          New to here : {` `} <Link to="/register">Register Now</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
