import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { ChatsContext } from "../../../contexts/ChatsProvider";
import ProfilePicture from "../../profilePicture/ProfilePicture";
import "./chatHeader.css";

const ChatHeader = () => {
  const { chats } = useContext(ChatsContext);
  const currentChatParamsId = useParams().chatId;
  const currentChat = chats.find((chat) => chat._id === currentChatParamsId);

  if (currentChat) {
    return (
      <div className="chat-header-container">
        <div className="chat-header-wrapper">
          <ProfilePicture members={currentChat?.membersInfos} size="medium" />
          <h1 className="chat-header-username">
            {currentChat?.membersInfos[0].username}
          </h1>
        </div>
      </div>
    );
  } else return <></>;
};

export default ChatHeader;
