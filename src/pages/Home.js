import React from "react";
import { Link } from "react-router-dom";

function getFile(fileName) {
  import(`/${fileName}`);
}
const Home = () => {
  sessionStorage.setItem("username", window.prompt("please Enter your Name:"));
  return (
    <div>
      <h1>Wecome to Chat App</h1>
      <ul>
        <li>
          <Link to="/login" onMouseOver={() => getFile("Login")}>
            login
          </Link>
        </li>
        <li>
          <Link to="/signup" onMouseOver={() => getFile("SignUp")}>
            signup
          </Link>
        </li>
        <li>
          <Link to="/chatApp" onMouseOver={() => getFile("ChatApp")}>
            chatApp
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Home;
