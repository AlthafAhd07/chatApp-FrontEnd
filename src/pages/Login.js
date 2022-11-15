import React, { useEffect, useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import { postAPI } from "../utils/fetchData";

import "../styles/auth/auth.css";
import Loader from "../components/global/Loader";

const Login = ({ setAlert }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("logged") === "true") {
      navigate("/");
    }
  }, []);
  async function handleSubmit(e) {
    e.preventDefault();

    if (email.length < 1 || password.length < 1) {
      setAlert({
        type: "err",
        msg: "Please fill all fields",
        visible: true,
      });
      return;
    }
    try {
      setLoading(true);
      await postAPI("login", { account: email, password });

      localStorage.setItem("logged", "true");
      setLoading(false);
      setAlert({ type: "success", msg: "Login Success", visible: true });
      navigate("/");
    } catch (error) {
      setLoading(false);
      setAlert({ type: "err", msg: error.response.data.msg, visible: true });
    }
  }

  return (
    <div className="auth">
      {loading && (
        <div className="loading__wrapper">
          <Loader />
        </div>
      )}
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
