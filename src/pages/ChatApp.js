import { createContext, useEffect, useMemo, useRef, useState } from "react";

import Controller from "../components/chatApp/Controller/Controller";
import Main from "../components/chatApp/Messanger/Main";
import RightSideBar from "../components/chatApp/RightSidebar/RightSideBar";
import LeftSideBar from "../components/chatApp/LeftSideBar/LeftSideBar";
import "../styles/chatApp/chatApp.css";

import socket from "../socket";

export const ChatStateContext = createContext();

const ChatApp = () => {
  const username = sessionStorage.getItem("username");
  const [chatState, setChatState] = useState();
  const [chatList, setChatList] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);

  //  using socket.io
  //ws://chat-app-backend-althaf.herokuapp.com/

  useEffect(() => {
    socket.auth = { username };

    socket.connect();

    return () => socket.close();
  }, []);

  return (
    <ChatStateContext.Provider
      value={{
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
