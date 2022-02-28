import React from "react";
import "./chatMessagesSkeleton.css";
export const ChatMessagesSkeleton = () => {
  return (
    <>
      {skeletonMessages.map((item, i) => (
        <div
          key={i}
          className={
            item.own
              ? "chat-message-wrapper-skeleton own"
              : "chat-message-wrapper-skeleton"
          }
        >
          {!item.own && <div className="chat-message-PP-skeleton" />}
          <div
            style={{ padding: item.padding, width: item.width }}
            className="chat-message-skeleton"
          ></div>
        </div>
      ))}
    </>
  );
};

export default ChatMessagesSkeleton;

const skeletonMessages = [
  {
    own: false,
    padding: "20px 0",
    width: "40%",
  },
  {
    own: true,
    padding: "40px 0",
    width: "40%",
  },
  {
    own: false,
    padding: "20px 0",
    width: "40%",
  },
  {
    own: true,
    padding: "20px 0",
    width: "20%",
  },
  {
    own: false,
    padding: "60px 0",
    width: "40%",
  },
  {
    own: true,
    padding: "20px 0",
    width: "40%",
  },
  {
    own: false,
    padding: "40px 0",
    width: "40%",
  },
  {
    own: true,
    padding: "20px 0",
    width: "40%",
  },
  {
    own: false,
    padding: "20px 0",
    width: "20%",
  },
];
