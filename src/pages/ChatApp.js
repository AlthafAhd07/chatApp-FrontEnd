import { createContext, useRef, useState } from "react";

import Controller from "../components/chatApp/Controller/Controller";
import Main from "../components/chatApp/Messanger/Main";
import RightSideBar from "../components/chatApp/RightSidebar/RightSideBar";
import LeftSideBar from "../components/chatApp/LeftSideBar/LeftSideBar";
import "../styles/chatApp/chatApp.css";

import { io } from "socket.io-client";

export const ChatStateContext = createContext();

const ChatApp = () => {
  const username = sessionStorage.getItem("username");
  const [chatState, setChatState] = useState();
  const [chatList, setChatList] = useState([]);

  //  using socket.io

  const socket = useRef(
    io("ws://chat-app-backend-althaf.herokuapp.com/", {
      reconnectionDelayMax: 10000,
      auth: {
        username,
      },
      query: {
        avatar:
          "https://res.cloudinary.com/davg6e0yh/image/upload/v1665244033/vicky-hladynets-C8Ta0gwPbQg-unsplash_b6odex.jpg",
      },
    })
  );

  return (
    <ChatStateContext.Provider
      value={{
        chatState,
        setChatState,
        socket: socket.current,
        chatList,
        setChatList,
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
