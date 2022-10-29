import React, { useContext, useEffect, useRef } from "react";
import { ChatStateContext } from "../../../pages/ChatApp";

const SingleMessageOpponent = ({
  msg,
  ReadMsgs,
  GlobalFocusRefCount,
  unReadMsgFocusRef,
}) => {
  const username = sessionStorage.getItem("username");
  const { socket, chatState, setChatList } = useContext(ChatStateContext);
  const ref = useRef();

  const updateMsgStatus = () => {
    setChatList((old) => {
      return old.map((item) => {
        if (item._id === chatState._id) {
          return {
            ...item,
            unReadMsgs: {
              ...item.unReadMsgs,
              [username]:
                item.unReadMsgs[username] > 0
                  ? item.unReadMsgs[username] - 1
                  : 0,
            },
          };
        } else {
          return item;
        }
      });
    });

    fetch("https://chat-app-backend-althaf.herokuapp.com/api/updateMsgStatus", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        conversationId: chatState._id,
        msgId: msg.id,
        username,
      }),
    }).then((res) => {});
  };

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        if (msg.status === "sent") {
          if (!ReadMsgs.current.includes(msg.id)) {
            ReadMsgs.current.push(msg.id);
            updateMsgStatus();
            socket.emit("msgStatus", {
              msgId: msg.id,
              room: chatState._id + "12345",
            });
          }
        }
      }
    });
    if (ref.current) {
      observer.observe(ref.current);
    }
  }, [ref, chatState]);
  if (GlobalFocusRefCount.current && msg.status === "sent") {
    GlobalFocusRefCount.current = false;
    return (
      <div className="main__singleMsg" ref={ref}>
        <p className="main__message" ref={unReadMsgFocusRef}>
          {msg.message}
        </p>
        <div className="main__msgFeature">
          <span className="main__msgTime">{msg.time}</span>
        </div>
      </div>
    );
  }
  return (
    <div className="main__singleMsg" ref={ref}>
      <p className="main__message">{msg.message}</p>
      <div className="main__msgFeature">
        <span className="main__msgTime">{msg.time}</span>
      </div>
    </div>
  );
};

export default SingleMessageOpponent;
