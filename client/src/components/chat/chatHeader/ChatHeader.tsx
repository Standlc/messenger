import React from "react";
import { Conversation } from "../../../ChatApp";
import ProfilePicture from "../../profilePicture/ProfilePicture";
import "./chatHeader.css";

const ChatHeader = ({
  currentConversation,
}: {
  currentConversation: Conversation | null;
}) => {
  if (currentConversation) {
    return (
      <div className="chat-header-container">
        <div className="chat-header-wrapper">
          <ProfilePicture
            members={currentConversation?.membersInfos}
            size="large"
          />
          <h1 className="chat-header-username">
            {currentConversation?.membersInfos[0].username}
          </h1>
        </div>
      </div>
    );
  } else return <></>;
};

export default ChatHeader;
