import moment from "moment";
import React, { useContext } from "react";
import { Message } from "../../../../ChatApp";
import { UserContext } from "../../../../contexts/UserProvider";
import { hasCloseNeighbor } from "../isMessageClose";
import "./chatMessage.css";

const ChatMessage = ({
  message,
  messages,
  i,
}: {
  message: Message;
  messages: Message[];
  i: number;
}) => {
  const { user, setUser } = useContext(UserContext);
  const isOwnMessage = user?._id === message.userInfos._id;
  const isNextMessageClose = hasCloseNeighbor({
    order: "next",
    messages,
    i,
  });
  const isPrevMessageClose = hasCloseNeighbor({
    order: "prev",
    messages,
    i,
  });
  const has2Neighbors = "conversation-message up down";
  const hasNeighborAbove = "conversation-message up";
  const hasNeighborBelow = "conversation-message down";
  const has2NeighborsAndIsOwn = "conversation-message own up down";
  const hasNeighborAboveAndIsOwn = "conversation-message own up";
  const hasNeighborBelowAndIsOwn = "conversation-message own down";

  return (
    <div
      key={message._id}
      className={
        isOwnMessage
          ? "conversation-message-wrapper own"
          : "conversation-message-wrapper"
      }
    >
      <p
        className={
          isOwnMessage ? "conversation-message own" : "conversation-message"
        }
      >
        {message.content}
      </p>
      {!isNextMessageClose && (
        <p className="conversation-message-date">
          {moment(message.createdAt).format("H:mm")}
        </p>
      )}
    </div>
  );
};

export default ChatMessage;
