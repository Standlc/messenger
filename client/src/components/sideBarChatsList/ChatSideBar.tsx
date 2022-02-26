import React, { useContext } from "react";
import { Chat } from "../../ChatApp";
import { UserContext } from "../../contexts/UserProvider";
import SideBarChatItem from "./sideBarItem/SideBarChatItem";
import "./chatSideBar.css";
import SideBarHeader from "./sideBarHeader/SideBarHeader";

const ChatSideBar = ({ chats }: { chats: Chat[] }) => {
  const { user } = useContext(UserContext);

  return (
    <div className="chat-side-bar-container">
      <SideBarHeader />
      <div className="chat-side-bar-wrapper">
        {chats.map((chat) => (
          <SideBarChatItem key={chat._id} chat={chat} />
        ))}
      </div>
    </div>
  );
};

export default ChatSideBar;
