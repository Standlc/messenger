import React from "react";
import "./chatDate.css";
import { Message } from "../../../../../types";

import { chatMessageDateFormat } from "../chatMessageDateFormat";
import { hasNeighborAbove } from "../groupeChatMessage";

const ChatDate = ({ messages, i }: { messages: Message[]; i: number }) => {
  const message = messages[i];
  const messageAbove = messages[i + 1];

  return (
    <>
      {!hasNeighborAbove({
        message,
        messageAbove,
        groupAll: true,
      }) && (
        <div className="chat-message-date-wrapper">
          <p className="chat-message-date">
            {chatMessageDateFormat({ messages, i })}
          </p>
          <div className="chat-message-date-divider" />
        </div>
      )}
    </>
  );
};

export default ChatDate;
