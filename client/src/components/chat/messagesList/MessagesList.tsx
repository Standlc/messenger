import React from "react";
import { Message } from "../../../ChatApp";
import ChatMessage from "./chatMessage/ChatMessage";
import "./messagesList.css";

const MessagesList = ({ messages }: { messages: Message[] }) => {
  return (
    <div className="chat-messages-list-container">
      <div className="chat-messages-list-wrapper">
        {messages.map((message, i) => (
          <ChatMessage key={message._id} messages={messages} i={i} />
        ))}
      </div>
    </div>
  );
};

export default MessagesList;
