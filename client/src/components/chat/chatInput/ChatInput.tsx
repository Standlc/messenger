import React, { useEffect, useRef, useState } from "react";
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

  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const handleInput = (e: any) => {
    setMessageInput(e.target.value);
    autoGrow();
  };

  //AUTO GROW
  const verticlePadding = 15;
  const autoGrow = () => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "0px";
      textAreaRef.current.style.height = `${
        textAreaRef.current.scrollHeight - verticlePadding
      }px`;
    }
  };
  useEffect(() => {
    autoGrow();
  }, [textAreaRef]);

  return (
    <div className="chat-input-wrapper">
      <textarea
        ref={textAreaRef}
        className="chat-input"
        value={messageInput}
        onChange={handleInput}
        placeholder="Your message..."
      ></textarea>

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
