import "./styles/App.css";
import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { useDelayUnmount } from "delay-unmount";

import ChatApp from "./pages/ChatApp";
import Signup from "./pages/SignUp";
import Login from "./pages/Login";
import Toast from "./components/global/alert/Toast";

function App() {
  const [alert, setAlert] = useState({
    visible: false,
    msg: "hi",
    type: "success",
  });

  useEffect(() => {
    if (alert.visible === true) {
      setTimeout(() => {
        setAlert((old) => ({ ...old, visible: false }));
      }, 5000);
    }
  }, [alert.visible]);

  const show = useDelayUnmount(alert.visible, 950);

  return (
    <BrowserRouter>
      <div className="App">
        {show && <Toast setAlert={setAlert} toast={alert} />}
        <Routes>
          <Route path="/" element={<ChatApp setAlert={setAlert} />} exact />
          <Route path="/login" element={<Login setAlert={setAlert} />} exact />
          <Route
            path="/register"
            element={<Signup setAlert={setAlert} />}
            exact
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
