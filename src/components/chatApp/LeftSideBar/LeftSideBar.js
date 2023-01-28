import React, { useContext } from "react";

import "../../../styles/chatApp/leftSideBar.css";

import HomeIcon from "@mui/icons-material/Home";
import ChatIcon from "@mui/icons-material/Chat";
import ContactsIcon from "@mui/icons-material/Contacts";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import SettingsIcon from "@mui/icons-material/Settings";

import { ChatStateContext } from "../../../pages/ChatApp";
import { useNavigate } from "react-router-dom";
import { CheckTokenEx } from "../../../utils/checkTockenExpiration";

const LeftSideBar = () => {
  const {
    authUser: { user, access_token },
  } = useContext(ChatStateContext);

  const navigate = useNavigate();

  const handleLogOut = async () => {
    localStorage.removeItem("logged");

    navigate("/login");

    const accessToken = await CheckTokenEx(access_token);

    fetch("api/logout", {
      headers: {
        Authorization: accessToken,
        "Content-Type": "application/json",
      },
    });
  };

  return (
    <aside className="leftSideBar">
      <div className="leftSideBar__profilePic" data-display={!!user?.avatar}>
        <img
          className="skeleton"
          src={user?.avatar}
          alt=""
          data-display={!!user?.avatar}
          onClick={handleLogOut}
        />
      </div>
      <nav className="leftSideBar__navLinks ">
        <ul>
          <li>
            <HomeIcon />
          </li>
          <li>
            <ChatIcon />
          </li>
          <li>
            <ContactsIcon />
          </li>
          <li>
            <NotificationsIcon />
          </li>
          <li>
            <MoreHorizIcon />
          </li>
        </ul>
      </nav>
      <div className="leftSideBar__settings">
        <SettingsIcon />
      </div>
    </aside>
  );
};

export default LeftSideBar;
