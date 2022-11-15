import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { postAPI } from "../utils/fetchData";

import "../styles/auth/auth.css";
import Loader from "../components/global/Loader";

const Register = ({ setAlert }) => {
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("logged") === "true") {
      navigate("/");
    }
  }, []);
  function handleInputChange(e) {
    setUserData((old) => {
      return {
        ...old,
        [e.target.name]: e.target.value,
      };
    });
  }
  async function handleSubmit(e) {
    e.preventDefault();

    if (userData.username?.length < 4) {
      setAlert({
        type: "err",
        msg: "Username length should atleast 4 characters",
        visible: true,
      });
      return;
    }
    if (userData.password?.length < 6) {
      setAlert({
        type: "err",
        msg: "Password length shoud atleast 6 characters",
        visible: true,
      });
      return;
    }
    if (userData.password !== userData?.confirmPassword) {
      setAlert({
        type: "err",
        msg: "Confirm password not match",
        visible: true,
      });
      return;
    }
    try {
      setLoading(true);
      await postAPI("register", {
        name: userData.username,
        account: userData.email,
        password: userData.password,
      });
      localStorage.setItem("logged", "true");
      setAlert({
        type: "success",
        msg: "Account successfully created.",
        visible: true,
      });
      setLoading(false);
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
      <div className="auth__wrapper register">
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="userName">Name</label>
          <input
            type="text"
            placeholder="Althaf"
            id="userName"
            name="username"
            value={userData.username || ""}
            onChange={handleInputChange}
          />
          <label htmlFor="email">Email</label>
          <input
            type="email"
            placeholder="althafahd07@gmail.com"
            id="email"
            name="email"
            value={userData.email || ""}
            onChange={handleInputChange}
          />
          <label htmlFor="Password">Password</label>
          <input
            type="password"
            id="Password"
            name="password"
            value={userData.password || ""}
            onChange={handleInputChange}
          />
          <label htmlFor="ConfirmPassword">Confirm Password</label>
          <input
            type="password"
            id="ConfirmPassword"
            name="confirmPassword"
            value={userData.confirmPassword || ""}
            onChange={handleInputChange}
          />
          <button type="submit">Register</button>
        </form>
        <div className="bottom__stuff">
          Already Have an Acccount : {` `} <Link to="/login">Login Now</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
