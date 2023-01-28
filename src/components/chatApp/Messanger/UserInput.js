import React, { useContext, useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import AttachFileIcon from "@mui/icons-material/AttachFile";
import SentimentSatisfiedAltOutlinedIcon from "@mui/icons-material/SentimentSatisfiedAltOutlined";
import SendIcon from "@mui/icons-material/Send";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import MicIcon from "@mui/icons-material/Mic";

import { ChatStateContext } from "../../../pages/ChatApp";
import socket from "../../../socket";
import { CheckTokenEx } from "../../../utils/checkTockenExpiration";

const UserInput = () => {
  const { chatState, setChatState, authUser } = useContext(ChatStateContext);
  const [showEmoji, setShowEmoji] = useState(false);
  const [message, setMessage] = useState("");
  const inpFocusRef = useRef();

  const handleOnChange = (event) => {
    setMessage(event.target.value);
    socket.emit("sent_typer", {
      typingUser: { username: authUser?.user?.username, typing: true },
      room: chatState._id + "123",
    });
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      // this function will run after user finished typing
      socket.emit("sent_typer", {
        typingUser: { username: authUser?.user?.username, typing: false },
        room: chatState._id + "123",
      });
    }, 500);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [message]);

  async function sendMsg() {
    if (!message) {
      return;
    }
    const newSendMsg = {
      id: uuidv4(),
      from: authUser?.user?.username,
      message: message,
      time: new Date().toLocaleString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      }),
      date: new Date().toLocaleDateString("fr-CA"),
      status: "sent",
    };

    setMessage("");
    inpFocusRef.current.focus();

    setChatState((old) => {
      return {
        ...old,
        messages: [...old.messages, newSendMsg],
      };
    });

    socket.emit("send_message", {
      room: chatState._id,
      message: newSendMsg,
      receiver: chatState.participant.filter(
        (i) => i.name !== authUser?.user?.username
      )[0].name,
      conversationId: chatState._id,
    });

    const accessToken = await CheckTokenEx(authUser?.access_token);

    fetch("/api/updateMessage", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: accessToken,
      },
      body: JSON.stringify({
        opponent: chatState?.participant.filter(
          (v) => v.name !== authUser?.user?.username
        )[0],
        newMsg: newSendMsg,
      }),
    }).then((res) => res.json());
  }

  return (
    <div className="main__userInput">
      <div className="main__userInputWrapper">
        <div className="main__attachFile">
          <AttachFileIcon />
        </div>

        <div className="main__InputAndEmoji">
          <input
            placeholder="Type a message here..."
            value={message}
            onInput={handleOnChange}
            autoComplete="off"
            ref={inpFocusRef}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                sendMsg();
              }
              return;
            }}
          />

          <div>
            <SentimentSatisfiedAltOutlinedIcon
              onClick={() => setShowEmoji((old) => !old)}
              className="main__SelectEmojiIcon"
              style={{
                color: `${showEmoji ? "#3bb3ee" : "#5555677d"}`,
                transition: "all 300ms ease-in-out",
              }}
            />

            <div
              className="main__emojiPicker"
              style={{
                scale: `${showEmoji ? "0.9" : "0"}`,
                transition: "all 300ms ease-in-out",
                transformOrigin: "75% bottom",
              }}
            >
              <Picker
                data={data}
                onEmojiSelect={(e) => {
                  setMessage((old) => old + e.native);
                }}
              />
            </div>
          </div>
        </div>

        <div className="main__SendAndVoice">
          {message ? (
            <SendIcon
              style={{
                color: "#40a7e3",
                marginLeft: "14px",
              }}
              onClick={sendMsg}
            />
          ) : (
            <MicIcon style={{ color: "#5555677d", marginLeft: "13px" }} />
          )}
        </div>
      </div>
    </div>
  );
};

export default UserInput;
