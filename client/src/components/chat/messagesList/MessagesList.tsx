import React from "react";
import { Message } from "../../../ChatApp";
import ChatMessage from "./chatMessage/ChatMessage";
import "./messageConversationList.css";

const MessagesList = ({ messages }: { messages: Message[] }) => {
  return (
    <div className="conversation-message-list-container">
      {messages.map((message, i) => (
        <ChatMessage key={i} message={message} messages={messages} i={i} />
      ))}
    </div>
  );
};

export default MessagesList;
