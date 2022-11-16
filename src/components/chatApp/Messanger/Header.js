import React, { useContext, useEffect, useState } from "react";

import CallIcon from "@mui/icons-material/Call";
import VideocamIcon from "@mui/icons-material/Videocam";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { ReactComponent as BakcIcon } from "../../../images/thin-arrow-left-icon.svg";

import { ChatStateContext } from "../../../pages/ChatApp";
import socket from "../../../socket";

const Header = () => {
  const { chatState, setChatState, onlineUsers, authUser } =
    useContext(ChatStateContext);

  const opponent = chatState?.opponentUserData;

  const [typing, setTyping] = useState(false);
  const [opponetOnline, setOpponetOnline] = useState(opponent?.online[0]);

  function diff_minutes(opponentOnlineTIme) {
    var diff = (new Date().getTime() - opponentOnlineTIme.getTime()) / 1000;
    diff /= 60;
    return Math.abs(Math.round(diff));
  }

  let timeDiff = diff_minutes(new Date(opponent?.online[1]));

  // let timeDiff = diff_minutes(new Date(opponent?.online[1]));

  useEffect(() => {
    socket.on("updateOffline", (data) => {
      setChatState((old) => {
        return {
          ...old,
          opponentUserData: {
            ...old.opponentUserData,
            online: ["false", Date.now()],
          },
        };
      });
    });
  }, [socket]);

  let lastSeen;
  if (timeDiff > 60) {
    let hour = Math.round(timeDiff / 60);

    if (hour >= 24) {
      let day = Math.round(hour / 24);
      lastSeen = `${day} ${day > 1 ? "days" : "day"} ago`;
    } else {
      lastSeen = `${hour} ${hour > 1 ? "hours" : "hour"} ago`;
    }
  } else {
    if (timeDiff === 0) {
      lastSeen = `just now`;
    } else {
      lastSeen = `${timeDiff} ${timeDiff > 1 ? "minutes" : "minute"} ago`;
    }
  }

  useEffect(() => {
    socket.on("receive_typer", (typingUser) => {
      if (typingUser.username !== authUser?.user?.username) {
        setTyping(typingUser.typing);
      }
    });
  }, [socket]);

  useEffect(() => {
    if (!!onlineUsers.find((i) => i.username === opponent?.username)) {
      setOpponetOnline("true");
    }
    return () => {
      setOpponetOnline("false");
    };
  }, [onlineUsers, chatState]);

  return (
    <div className="main__header">
      <div className="main__headerWrapper">
        <div className="main__headerUserInfo">
          <span onClick={() => setChatState("")}>
            <BakcIcon className="header__backIcon" />
          </span>
          <img src={opponent?.avatar} alt="" />
          <div>
            <h3>{opponent?.username}</h3>

            <span>
              {!typing &&
                (opponetOnline === "true"
                  ? "Online"
                  : `Offline . Last seen ${lastSeen}`)}
              {typing && "Typing..."}
            </span>
          </div>
        </div>
        <div className="main__headerFeatures">
          <CallIcon />
          <VideocamIcon />
          <MoreHorizIcon />
        </div>
      </div>
    </div>
  );
};

export default Header;
