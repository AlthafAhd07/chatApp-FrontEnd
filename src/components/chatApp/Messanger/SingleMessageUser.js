import React, { useContext, useEffect, useState } from "react";

import DoneAllIcon from "@mui/icons-material/DoneAll";
import DoneIcon from "@mui/icons-material/Done";
import { ChatStateContext } from "../../../pages/ChatApp";

const SingleMessageUser = ({ msg }) => {
  const { socket } = useContext(ChatStateContext);
  const [readMsg, setReadMsg] = useState(false);
  useEffect(() => {
    socket.on("recieveMsgStatus", (msgId) => {
      if (msgId === msg.id) {
        setReadMsg(true);
      }
    });
  }, [socket]);
  return (
    <div className="main__singleMsg main__singleMsg-right">
      <p className="main__message">{msg.message}</p>
      <div className="main__msgFeature">
        <span className="main__msgTime">{msg.time}</span>
        <span
          className="main__msgStatus"
          style={{
            color: msg.status === "read" || readMsg ? "blue" : "#999090fc",
          }}
        >
          {!readMsg &&
            (msg.status.length && msg.status === "sent" ? (
              <DoneIcon />
            ) : (
              <DoneAllIcon />
            ))}
          {readMsg && <DoneAllIcon />}
        </span>
      </div>
    </div>
  );
};

export default SingleMessageUser;
