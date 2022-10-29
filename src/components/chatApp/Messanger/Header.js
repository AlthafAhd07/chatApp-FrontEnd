import React, { useContext, useEffect, useState } from "react";
import CallIcon from "@mui/icons-material/Call";
import VideocamIcon from "@mui/icons-material/Videocam";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import profilePic from "../../../images/vicky-hladynets-C8Ta0gwPbQg-unsplash.jpg";
import { ChatStateContext } from "../../../pages/ChatApp";

const Header = () => {
  const username = sessionStorage.getItem("username");
  const { chatState, socket, setChatState } = useContext(ChatStateContext);
  const opponent = chatState?.opponentUserData;
  const [typing, setTyping] = useState(false);
  function diff_minutes(opponentOnlineTIme) {
    var diff = (new Date().getTime() - opponentOnlineTIme.getTime()) / 1000;
    diff /= 60;
    return Math.abs(Math.round(diff));
  }

  let timeDiff = diff_minutes(new Date(opponent?.online[1]));
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
    // socket.on("updateOnline", () => {
    //   if (chatState.opponentUserData.online[0] === "false") {
    //     setChatState((old) => {
    //       return {
    //         ...old,
    //         opponentUserData: {
    //           ...old.opponentUserData,
    //           online: ["true", "now"],
    //         },
    //       };
    //     });
    //   }
    // });
  }, [socket]);
  let lastSeen;
  if (timeDiff > 60) {
    let hour = Math.round(timeDiff / 60);
    lastSeen = `${hour} ${hour > 1 ? "hours" : "hour"} ago`;
  } else {
    if (timeDiff === 0) {
      lastSeen = `just now`;
    } else {
      lastSeen = `${timeDiff} ${timeDiff > 1 ? "minutes" : "minute"} ago`;
    }
  }

  useEffect(() => {
    socket.on("receive_typer", (typingUser) => {
      if (typingUser.username !== username) {
        setTyping(typingUser.typing);
      }
    });
  }, [socket]);

  return (
    <div className="main__header">
      <div className="main__headerWrapper">
        <div className="main__headerUserInfo">
          <img src={profilePic} alt="" />
          <div>
            <h3>{opponent?.username}</h3>

            <span>
              {!typing &&
                (opponent?.online[0] === "true"
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
