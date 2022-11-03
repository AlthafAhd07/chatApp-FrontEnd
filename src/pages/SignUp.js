import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { postAPI } from "../utils/fetchData";

import "../styles/auth/auth.css";

const Register = () => {
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

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
      return;
    }
    if (userData.password?.length < 6) {
      return;
    }
    if (userData.password !== userData?.confirmPassword) {
      return;
    }
    try {
      const res = await postAPI("register", {
        name: userData.username,
        account: userData.email,
        password: userData.password,
      });
      localStorage.setItem("logged", "true");
      navigate("/");
    } catch (error) {
      console.log(error.response.data);
    }
  }
  return (
    <div className="auth">
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
