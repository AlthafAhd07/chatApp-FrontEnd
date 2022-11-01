import React, { useContext, useEffect } from "react";

import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import DoneIcon from "@mui/icons-material/Done";

import { ChatStateContext } from "../../../pages/ChatApp";
const Chats = ({ toggled, FetchALLChats }) => {
  const username = sessionStorage.getItem("username");
  const { chatState, setChatState, socket, chatList, setChatList } =
    useContext(ChatStateContext);

  useEffect(() => {
    if (!chatState) {
      return;
    }
    setChatList((old) => {
      return old.map((item) => {
        if (item._id === chatState._id) {
          return {
            ...item,
            messages: [chatState.messages[chatState.messages.length - 1]],
          };
        } else {
          return item;
        }
      });
    });
  }, [chatState]);

  useEffect(() => {
    if (!socket) return;
    socket.on("updateChatList", ({ conversationId, message }) => {
      setChatList((old) => {
        if (!!old.find((i) => i._id === conversationId)) {
          return old.map((item) => {
            if (item._id === conversationId) {
              return {
                ...item,
                messages: [message],
                unReadMsgs: {
                  ...item.unReadMsgs,
                  [username]: item.unReadMsgs[username] + 1,
                },
              };
            } else {
              return item;
            }
          });
        } else {
          FetchALLChats();
        }
      });
    });
  }, [socket]);

  useEffect(() => {
    FetchALLChats();
  }, []);

  function selectChat(opponent) {
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
        if (chatState) {
          socket.emit("leaveRoom", chatState._id);
        }
        socket.emit("join__room", res.msg._id);
      });
  }

  return (
    <div
      className="controller__Chats"
      data-height={toggled}
      style={{
        transition: "all 300ms ease-in-out",
      }}
    >
      <h5>Messages</h5>
      <div className="controller__ChatsList">
        {chatList?.map((chat) => {
          const opponetUser = chat.participant.filter((v) => v !== username)[0];
          let unReadMsgCout = chat.unReadMsgs[username];
          return (
            <div
              className="controller__singleChat"
              key={chat._id}
              onClick={() => {
                selectChat(opponetUser);
              }}
            >
              <div className="controller__singleChatProfile"></div>
              <div className="controller__singleChatName">
                <h3>{chat.participant.filter((v) => v !== username)}</h3>
                <div>
                  {chat?.messages[0]?.from === username && (
                    <span className="controller__lastChatStatus">
                      {chat?.messages[0]?.status === "sent" && <DoneIcon />}
                      {(chat?.messages[0]?.status === "delivered" ||
                        chat?.messages[0]?.status === "read") && (
                        <DoneAllIcon
                          style={{
                            color: `${
                              chat?.messages[0]?.status === "read"
                                ? "blue"
                                : "#999090fc"
                            }`,
                          }}
                        />
                      )}
                    </span>
                  )}
                  <span className="controller__lastChat">
                    {chat?.messages[0]?.message ||
                      `No messages Yet with ${
                        chat.participant.filter((v) => v !== username)[0]
                      }`}
                  </span>
                </div>
              </div>
              <div className="controller__singleChatLastMsg">
                {chat?.messages[0]?.time}
              </div>
              {unReadMsgCout > 0 && (
                <div
                  style={{ position: "absolute", right: "20px", bottom: "0" }}
                >
                  <NotificationsActiveIcon
                    style={{ fontSize: "30px", color: "#231f20" }}
                  />
                  <span
                    style={{
                      position: "absolute",
                      top: "-2px",
                      right: "-5px",
                      backgroundColor: "Red",
                      borderRadius: "50%",
                      width: "15px",
                      height: "15px",
                      fontSize: "10px",
                      color: "white",
                      fontWeight: "700",
                      border: "2px solid white",
                      textAlign: "center",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {unReadMsgCout}
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Chats;
