import React, { useContext } from "react";

import "../../../styles/chatApp/leftSideBar.css";

import HomeIcon from "@mui/icons-material/Home";
import ChatIcon from "@mui/icons-material/Chat";
import ContactsIcon from "@mui/icons-material/Contacts";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import SettingsIcon from "@mui/icons-material/Settings";

import { ChatStateContext } from "../../../pages/ChatApp";

const LeftSideBar = () => {
  const {
    authUser: { user },
  } = useContext(ChatStateContext);

  return (
    <aside className="leftSideBar">
      <div className="leftSideBar__profilePic">
        <img src={user?.avatar} alt="Profile" />
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
