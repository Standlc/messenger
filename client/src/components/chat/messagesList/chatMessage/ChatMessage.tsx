import React, { useContext, useRef, useState } from "react";
import { Message } from "../../../../types";
import { UserContext } from "../../../../contexts/UserProvider";
import { hasCloseNeighbor } from "../isMessageClose";
import "./chatMessage.css";
import { scrollIntoView } from "./scrollIntoView";
import ProfilePicture from "../../../profilePicture/ProfilePicture";
import ChatDate from "./chatTime/ChatDate";
import { chatMessageDateFormat } from "./chatMessageDateFormat";

const ChatMessage = ({ messages, i }: { messages: Message[]; i: number }) => {
  const { user } = useContext(UserContext);
  const messageRef = useRef<HTMLDivElement>(null);
  const isOwnMessage = user?._id === messages[i].userInfos._id;

  const [mouseOverTimeOut, setMouseOverTimeOut] = useState<NodeJS.Timeout>();
  const [isMouseHovering, setIsMouseHovering] = useState(false);

  //HOVER MESSAGE
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

  const hasNeighborBelow = hasCloseNeighbor({
    order: "next",
    messages,
    i,
  });
  const hasNeighborAbove = hasCloseNeighbor({
    order: "prev",
    messages,
    i,
  });

  const chatMessageClassName = () => {
    if (isOwnMessage) {
      if (hasNeighborBelow && hasNeighborAbove)
        return "chat-message own-up-down";
      else if (hasNeighborBelow && !hasNeighborAbove)
        return "chat-message own-down";
      else if (!hasNeighborBelow && hasNeighborAbove)
        return "chat-message own-up";
      else return "chat-message own";
    } else {
      if (hasNeighborBelow && hasNeighborAbove) return "chat-message up-down";
      else if (hasNeighborBelow && !hasNeighborAbove)
        return "chat-message down";
      else if (!hasNeighborBelow && hasNeighborAbove) return "chat-message up";
      else return "chat-message";
    }
  };

  // useEffect(() => {
  //   scrollIntoView(messageRef);
  // }, [messageRef]);

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
        {!hasNeighborBelow && !isOwnMessage && (
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
          className={chatMessageClassName()}
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
