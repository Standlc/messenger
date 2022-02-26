import React, { useContext } from "react";
import SideBarChatItem from "./sideBarItem/SideBarChatItem";
import "./chatSideBar.css";
import SideBarHeader from "./sideBarHeader/SideBarHeader";
import { ChatsContext } from "../../contexts/ChatsProvider";

const ChatSideBar = () => {
  const { chats } = useContext(ChatsContext);
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
