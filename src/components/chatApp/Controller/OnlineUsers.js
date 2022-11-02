import React, { useContext, useEffect, useState } from "react";

import Avatar from "../../../images/vicky-hladynets-C8Ta0gwPbQg-unsplash.jpg";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import { ChatStateContext } from "../../../pages/ChatApp";
import socket from "../../../socket";

const OnlineUsers = ({ toggled, setToggled, FetchALLChats }) => {
  const username = sessionStorage.getItem("username");
  const { setChatState, chatState, onlineUsers, setOnlineUsers } =
    useContext(ChatStateContext);

  useEffect(() => {
    if (!socket) return;

    socket.emit("getOnlineUsers", "give online users");
    socket.on("onlineusers", (data) => {
      console.log(data);
      setOnlineUsers(data);
    });
    socket.on("updateOnline", (data) => {
      setOnlineUsers((old) => {
        const filtered = old.filter((i) => i.username !== data.username);
        return [data, ...filtered];
      });
    });
    socket.on("updateOffline", (data) => {
      setOnlineUsers((old) => old.filter((d) => d.username !== data));
    });
  }, [socket]);
  function selectChat(opponent) {
    if (!chatState?.Chatname.includes(opponent)) {
      fetch("https://chat-app-backend-althaf.herokuapp.com/api/specificChat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ username, opponent }),
      })
        .then((res) => res.json())
        .then((res) => {
          setChatState(res.msg);
          FetchALLChats();
          if (chatState) {
            socket.emit("leaveRoom", chatState._id);
          }
          socket.emit("join__room", res.msg._id);
        });
    }
  }

  return (
    <div
      className="controller__onlineUsers"
      style={{
        height: `${toggled ? "28px" : "125px"}`,
        transition: "all 300ms ease-in-out",
      }}
    >
      <h5>Online</h5>
      <div
        className="controller__toggler"
        onClick={() => {
          setToggled((t) => !t);
        }}
      >
        <KeyboardArrowDownIcon
          style={{
            cursor: "pointer",
            transition: "all 300ms ease-in-out",
            transform: `${toggled ? "rotate(-360deg)" : "rotate(180deg)"}`,
          }}
        />
      </div>
      <div className="controller__onlineUserWrapper">
        <div className="controller__onlineUserProfileList">
          {onlineUsers?.map((user) => {
            return (
              <div
                className="controller__onlineUserProfile"
                key={user.username}
                onClick={() => {
                  selectChat(user.username);
                }}
              >
                <img src={Avatar} alt="" loading="lazy" />
                <p>{user.username}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default OnlineUsers;
