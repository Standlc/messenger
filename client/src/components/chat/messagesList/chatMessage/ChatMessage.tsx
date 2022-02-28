import React, { useContext, useEffect, useRef, useState } from "react";
import { Message } from "../../../../types";
import { UserContext } from "../../../../contexts/UserProvider";
import { groupChatMessage, hasNeighborBelow } from "./groupeChatMessage";
import "./chatMessage.css";
import { scrollIntoView } from "./scrollIntoView";
import ProfilePicture from "../../../profilePicture/ProfilePicture";
import ChatDate from "./chatTime/ChatDate";
import { chatMessageDateFormat } from "./chatMessageDateFormat";

const ChatMessage = ({ messages, i }: { messages: Message[]; i: number }) => {
  const { user } = useContext(UserContext);
  const isOwnMessage = user?._id === messages[i].userInfos._id;
  const messageRef = useRef<HTMLDivElement>(null);

  //HOVER MESSAGE
  const [mouseOverTimeOut, setMouseOverTimeOut] = useState<NodeJS.Timeout>();
  const [isMouseHovering, setIsMouseHovering] = useState(false);

  const handleMouseHoveringMessage = () => {
    setMouseOverTimeOut(
      setTimeout(() => {
        setIsMouseHovering(true);
      }, 500)
    );
  };
  const handleMouseLeaving = () => {
    if (mouseOverTimeOut) clearTimeout(mouseOverTimeOut);
    setIsMouseHovering(false);
  };

  useEffect(() => {
    groupChatMessage({ messages, i, messageRef, isOwnMessage });
  }, [messages, i, messageRef, isOwnMessage]);

  useEffect(() => {
    scrollIntoView({ messageRef, messages, i });
  }, [messageRef, messages, i]);

  const hasMessageBelow = hasNeighborBelow({
    message: messages[i],
    messageBelow: messages[i - 1],
  });

  return (
    <div
      className={
        isOwnMessage ? "chat-message-wrapper own" : "chat-message-wrapper"
      }
    >
      <ChatDate messages={messages} i={i} />
      <div
        className={
          isOwnMessage ? "chat-message-text-PP own" : "chat-message-text-PP"
        }
      >
        {!hasMessageBelow && !isOwnMessage && (
          <ProfilePicture
            members={[messages[i].userInfos]}
            size="small"
            absolute={true}
          />
        )}

        <div
          onMouseEnter={handleMouseHoveringMessage}
          onMouseLeave={handleMouseLeaving}
          ref={messageRef}
          className={isOwnMessage ? "chat-message own" : "chat-message"}
        >
          {messages[i].content}

          {isMouseHovering && (
            <div
              className={
                isOwnMessage
                  ? "chat-message-date-small own"
                  : "chat-message-date-small"
              }
            >
              {chatMessageDateFormat({ messages, i })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
