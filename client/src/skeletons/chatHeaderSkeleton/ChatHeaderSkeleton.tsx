import React from "react";
import "./chatHeaderSkeleton.css";

const ChatHeaderSkeleton = () => {
  return (
    <div className="chat-header-PP-wrapper-skeleton">
      <div className="chat-header-PP-skeleton" />
      <div className="chat-header-username-skeleton" />
    </div>
  );
};

export default ChatHeaderSkeleton;
