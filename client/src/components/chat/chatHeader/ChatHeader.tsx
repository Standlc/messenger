import React from "react";
import { useParams } from "react-router-dom";
import { Chat } from "../../../ChatApp";
import ProfilePicture from "../../profilePicture/ProfilePicture";
import "./chatHeader.css";

const ChatHeader = ({ chats }: { chats: Chat[] }) => {
  const currentChatParamsId = useParams().chatId;
  const currentChat = chats.find((chat) => chat._id === currentChatParamsId);

  if (currentChat) {
    return (
      <div className="chat-header-container">
        <div className="chat-header-wrapper">
          <ProfilePicture members={currentChat?.membersInfos} size="large" />
          <h1 className="chat-header-username">
            {currentChat?.membersInfos[0].username}
          </h1>
        </div>
      </div>
    );
  } else return <></>;
};

export default ChatHeader;
