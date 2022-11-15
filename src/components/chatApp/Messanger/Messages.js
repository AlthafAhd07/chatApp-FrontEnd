import React, { useContext, useEffect, useRef, useState } from "react";

import { ChatStateContext } from "../../../pages/ChatApp";
import SingleMessageUser from "./SingleMessageUser";
import SingleMessageOpponent from "./SingleMessageOpponent";
import socket from "../../../socket";
const Messages = ({ GlobalFocusRefCount, messageView }) => {
  const { chatState, setChatState, authUser } = useContext(ChatStateContext);
  const ReadMsgs = useRef([]);
  const unReadMsgFocusRef = useRef();

  useEffect(() => {
    if (!GlobalFocusRefCount.current) {
      messageView.current?.scrollIntoView({
        block: "start",
        behavior: "smooth",
      });
    }
  }, [chatState]);

  useEffect(() => {
    unReadMsgFocusRef.current?.scrollIntoView({
      block: "start",
      behavior: "smooth",
    });
  }, []);
  useEffect(() => {
    socket.on("receive_msg", (data) => {
      setChatState((old) => {
        return {
          ...old,
          messages: [...old.messages, data],
        };
      });
    });
    // socket.on("updateOffline", (data) => {
    //   fetch("http://localhost:3001/api/specificChat", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //       Accept: "application/json",
    //     },
    //     body: JSON.stringify({ username, opponent: data }),
    //   })
    //     .then((res) => res.json())
    //     .then((res) => {
    //       setChatState(res.msg);
    //       // socket.emit("join__room", res.msg._id);
    //     });
    // });
    // socket.on("updateOnline", (data) => {
    //   fetch("http://localhost:3001/api/specificChat", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //       Accept: "application/json",
    //     },
    //     body: JSON.stringify({ username, opponent: data.username }),
    //   })
    //     .then((res) => res.json())
    //     .then((res) => {
    //       setChatState(res.msg);
    //       socket.emit("join__room", res.msg._id);
    //     });
    // });
  }, [socket]);
  return (
    <div className="main__Messages">
      <div className="main__specificDateMsg">
        <section className="main__msgDate">October 05</section>
        {chatState?.messages?.map((msg) => {
          if (authUser?.user?.username === msg.from) {
            return <SingleMessageUser msg={msg} key={msg.id} />;
          } else {
            return (
              <SingleMessageOpponent
                msg={msg}
                key={msg.id}
                ReadMsgs={ReadMsgs}
                unReadMsgFocusRef={unReadMsgFocusRef}
                GlobalFocusRefCount={GlobalFocusRefCount}
              />
            );
          }
        })}
      </div>

      <div ref={messageView}></div>
    </div>
  );
};

export default Messages;
