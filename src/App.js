import "./styles/App.css";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import ChatApp from "./pages/ChatApp";
import Signup from "./pages/SignUp";
import Login from "./pages/Login";
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<ChatApp />} exact />
          <Route path="/login" element={<Login />} exact />
          <Route path="/register" element={<Signup />} exact />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
