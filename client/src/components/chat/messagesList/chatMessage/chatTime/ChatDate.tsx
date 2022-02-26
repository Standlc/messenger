import React from "react";
import "./chatDate.css";
import { Message } from "../../../../../types";
import { hasAboveNeighborOfSameTime } from "./hasAboveNeighbor";
import { chatMessageDateFormat } from "../chatMessageDateFormat";

const ChatDate = ({ messages, i }: { messages: Message[]; i: number }) => {
  const hasNeighborAbove = hasAboveNeighborOfSameTime({
    messages,
    i,
  });

  return (
    <>
      {!hasNeighborAbove && (
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
