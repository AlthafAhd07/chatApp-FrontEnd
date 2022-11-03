import { createContext, useEffect, useState } from "react";

import Controller from "../components/chatApp/Controller/Controller";
import Main from "../components/chatApp/Messanger/Main";
import RightSideBar from "../components/chatApp/RightSidebar/RightSideBar";
import LeftSideBar from "../components/chatApp/LeftSideBar/LeftSideBar";
import "../styles/chatApp/chatApp.css";

import socket from "../socket";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const ChatStateContext = createContext();

const ChatApp = () => {
  const [authUser, setauthUser] = useState("");
  const [chatState, setChatState] = useState();
  const [chatList, setChatList] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  //  using socket.io
  //ws://chat-app-backend-althaf.herokuapp.com/
  const navigate = useNavigate();

  useEffect(() => {
    const logged = localStorage.getItem("logged");
    if (logged !== "true") {
      navigate("/login");
      return;
    }
    async function getRefreshToken() {
      try {
        const res = await axios.get(`api/refresh_token`);
        setauthUser(res.data);
      } catch (error) {
        localStorage.setItem("logged", "false");
        return navigate("/login");
      }
    }
    getRefreshToken();
  }, []);

  useEffect(() => {
    if (!!authUser) {
      socket.auth = { token: authUser.access_token };
      socket.connect();
    }

    return () => socket.close();
  }, [authUser]);

  return (
    <ChatStateContext.Provider
      value={{
        authUser,
        chatState,
        setChatState,
        chatList,
        setChatList,
        onlineUsers,
        setOnlineUsers,
      }}
    >
      <div className="chatApp">
        <div className="chatApp__wrapper">
          <LeftSideBar />
          <Controller />
          <Main />
          <RightSideBar />
        </div>
      </div>
    </ChatStateContext.Provider>
  );
};

export default ChatApp;
