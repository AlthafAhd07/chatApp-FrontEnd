import React, { useContext, useEffect, useState } from "react";

import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import DoneIcon from "@mui/icons-material/Done";

import { ChatStateContext } from "../../../pages/ChatApp";
import socket from "../../../socket";
import { CheckTokenEx } from "../../../utils/checkTockenExpiration";
import Loader from "../../global/Loader";
const Chats = ({ toggled, FetchALLChats }) => {
  const {
    chatState,
    setChatState,
    setChatLoading,
    chatList,
    setChatList,
    authUser,
    loadingAllChat,
    setLoadingAllChat,
  } = useContext(ChatStateContext);
  useEffect(() => {
    socket.on("recieveMsgStatus", (msgId) => {
      if (!!chatList.find((i) => i.messages[0].id === msgId)) {
        setChatList((old) =>
          old.map((item) => {
            if (item.messages[0].id === msgId) {
              return {
                ...item,
                messages: [{ ...item.messages[0], status: "read" }],
              };
            } else {
              return item;
            }
          })
        );
      }
    });
  }, [socket, chatList]);

  useEffect(() => {
    setLoadingAllChat(true);
    if (authUser) {
      FetchALLChats();
    }
  }, [authUser]);

  useEffect(() => {
    if (chatList) {
      setLoadingAllChat(false);
    }
  }, [chatList]);
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
      console.log(conversationId, message);
      if (chatList.length > 0) {
        console.log(chatList);
        console.log(!!chatList.find((i) => i._id === conversationId));
        if (!!chatList.find((i) => i._id === conversationId)) {
          setChatList((old) =>
            old.map((item) => {
              if (item._id === conversationId) {
                return {
                  ...item,
                  messages: [message],
                  unReadMsgs: {
                    ...item.unReadMsgs,
                    [authUser?.user?.username]:
                      item.unReadMsgs[authUser?.user?.username] + 1,
                  },
                };
              } else {
                return item;
              }
            })
          );
        } else {
          FetchALLChats();
        }
      }
    });
  }, [socket, authUser, chatList]);

  async function selectChat(opponent) {
    setChatLoading(true);
    const accessToken = await CheckTokenEx(authUser?.access_token);
    fetch("/api/specificChat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: accessToken,
      },
      body: JSON.stringify({ opponent }),
    })
      .then((res) => res.json())
      .then((res) => {
        setChatState(res.msg);
        setChatLoading(false);
        if (chatState) {
          socket.emit("leaveRoom", chatState._id);
        }
        socket.emit("join__room", res.msg._id);
        socket.emit("newUserUpdate", "abc");
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
      {loadingAllChat && <Loader height={"90%"} />}
      <div className="controller__ChatsList">
        {chatList?.map((chat) => {
          const opponetUser = chat.participant.filter(
            (v) => v.name !== authUser?.user?.username
          )[0];
          let unReadMsgCout = chat.unReadMsgs[authUser?.user?.username];
          return (
            <div
              className="controller__singleChat"
              key={chat._id}
              onClick={() => {
                selectChat(opponetUser.name);
              }}
            >
              <div className="controller__singleChatProfile">
                {/* <img src={opponetUser.avatar} alt="userProfile" /> */}

                <img src={opponetUser.avatar} alt="" />
              </div>
              <div className="controller__singleChatName">
                <h3>{opponetUser.name}</h3>
                <div>
                  {chat?.messages[0]?.from === authUser?.user?.username && (
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
                      `No messages Yet with ${opponetUser.name}`}
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
