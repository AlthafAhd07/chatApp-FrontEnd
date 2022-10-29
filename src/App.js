import "./styles/App.css";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
const Signup = React.lazy(() => import("./pages/SignUp"));
const Login = React.lazy(() => import("./pages/Login"));
const ChatApp = React.lazy(() => import("./pages/ChatApp"));
function App() {
  return (
    <React.Suspense>
      <BrowserRouter>
        <div className="App">
          <Routes>
            <Route path="/" element={<Home />} exact />
            <Route path="/login" element={<Login />} exact />
            <Route path="/signup" element={<Signup />} exact />
            <Route path="/ChatApp" element={<ChatApp />} exact />
          </Routes>
        </div>
      </BrowserRouter>
    </React.Suspense>
  );
}

export default App;
