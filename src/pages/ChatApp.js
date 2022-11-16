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

const ChatApp = ({ setAlert }) => {
  const [authUser, setauthUser] = useState("");
  const [chatState, setChatState] = useState();
  const [chatList, setChatList] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [chatLoading, setChatLoading] = useState(false);
  const [loadingAllChat, setLoadingAllChat] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const logged = localStorage.getItem("logged");
    if (logged !== "true") {
      navigate("/login");
      return;
    }
    async function getRefreshToken() {
      try {
        setLoadingAllChat(true);
        const res = await axios.get("/api/refresh_token", {
          withCredentials: true,
        });
        setauthUser(res.data);
      } catch (error) {
        setLoadingAllChat(false);
        localStorage.setItem("logged", "false");
        setAlert({ type: "err", msg: "Please Login Now", visible: true });
        return navigate("/login");
      }
    }
    getRefreshToken();
  }, []);

  useEffect(() => {
    if (!!authUser) {
      socket.auth = { token: authUser?.access_token };
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
        chatLoading,
        setChatLoading,
        loadingAllChat,
        setLoadingAllChat,
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
