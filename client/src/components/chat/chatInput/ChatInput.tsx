import React, { useState } from "react";
import "./chatInput.css";

const ChatInput = ({
  sendMessage,
}: {
  sendMessage: ({
    messageInput,
    setMessageInput,
  }: {
    messageInput: string;
    setMessageInput: React.Dispatch<React.SetStateAction<string>>;
  }) => Promise<void>;
}) => {
  const [messageInput, setMessageInput] = useState<string>("");

  return (
    <div className="chat-input-wrapper">
      <input
        className="chat-input"
        value={messageInput}
        onChange={(e) => setMessageInput(e.target.value)}
        placeholder="Your message..."
      ></input>
      <button
        className={
          messageInput
            ? "chat-input-send-button active"
            : "chat-input-send-button"
        }
        onClick={() => sendMessage({ messageInput, setMessageInput })}
      >
        Send
      </button>
    </div>
  );
};

export default ChatInput;
