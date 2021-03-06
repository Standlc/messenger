import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { ChatsContext } from "../../../contexts/ChatsProvider";
import ChatHeaderSkeleton from "../../../skeletons/chatHeaderSkeleton/ChatHeaderSkeleton";
import ProfilePicture from "../../profilePicture/ProfilePicture";
import "./chatHeader.css";

const ChatHeader = () => {
  const { chats } = useContext(ChatsContext);
  const currentChatParamsId = useParams().chatId;
  const currentChat = chats.find((chat) => chat._id === currentChatParamsId);

  return currentChatParamsId ? (
    <div className="chat-header-container">
      <div className="chat-header-wrapper">
        {chats.length > 0 ? (
          <>
            <ProfilePicture members={currentChat?.membersInfos} size="medium" />
            <h1 className="chat-header-username">
              {currentChat?.membersInfos[0].username}
            </h1>
          </>
        ) : (
          <ChatHeaderSkeleton />
        )}
      </div>
    </div>
  ) : (
    <></>
  );
};

export default ChatHeader;
