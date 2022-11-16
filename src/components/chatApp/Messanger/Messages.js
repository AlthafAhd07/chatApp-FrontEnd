import React, { useContext, useEffect, useRef } from "react";

import { ChatStateContext } from "../../../pages/ChatApp";
import SingleMessageUser from "./SingleMessageUser";
import SingleMessageOpponent from "./SingleMessageOpponent";
import socket from "../../../socket";
const Messages = ({ GlobalFocusRefCount }) => {
  const { chatState, setChatState, authUser } = useContext(ChatStateContext);
  const ReadMsgs = useRef([]);
  const unReadMsgFocusRef = useRef();
  let messageView = useRef(null);

  const firstRender = useRef(true);

  useEffect(() => {
    if (!GlobalFocusRefCount.current) {
      messageView.current?.scrollIntoView({
        block: "start",
        behavior: "smooth",
      });
    }
  }, [chatState]);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    messageView.current?.scrollIntoView({
      block: "start",
      behavior: "smooth",
    });
  }, [chatState?.messages.length]);
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
