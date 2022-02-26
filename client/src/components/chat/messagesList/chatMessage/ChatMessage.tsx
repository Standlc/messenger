import React, { useContext, useEffect, useRef } from "react";
import { Message } from "../../../../types";
import { UserContext } from "../../../../contexts/UserProvider";
import { hasCloseNeighbor } from "../isMessageClose";
import "./chatMessage.css";
import { scrollIntoView } from "./scrollIntoView";
import ProfilePicture from "../../../profilePicture/ProfilePicture";
import ChatDate from "./chatTime/ChatDate";

const ChatMessage = ({ messages, i }: { messages: Message[]; i: number }) => {
  const { user } = useContext(UserContext);
  const messageRef = useRef<HTMLDivElement>(null);
  const isOwnMessage = user?._id === messages[i].userInfos._id;

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

  const className = () => {
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
      else if (hasNeighborBelow && !hasNeighborAbove) return "chat-message up";
      else return "chat-message";
    }
  };

  // useEffect(() => {
  //   scrollIntoView(messageRef);
  // }, [messageRef]);

  return (
    <div
      ref={messageRef}
      className={
        isOwnMessage ? "chat-message-wrapper own" : "chat-message-wrapper"
      }
    >
      <ChatDate messages={messages} i={i} />
      <div className="chat-message-text-PP">
        {!hasNeighborBelow && !isOwnMessage && (
          <ProfilePicture
            members={[messages[i].userInfos]}
            size="small"
            absolute={true}
          />
        )}
        <p className={className()}>{messages[i].content}</p>
      </div>
    </div>
  );
};

export default ChatMessage;
