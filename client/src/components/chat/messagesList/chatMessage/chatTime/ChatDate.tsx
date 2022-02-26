import React from "react";
import "./chatDate.css";
import { Message } from "../../../../../types";
import { DateTime } from "luxon";
import { hasAboveNeighborOfSameTime } from "./hasAboveNeighbor";

const ChatDate = ({ messages, i }: { messages: Message[]; i: number }) => {
  const hasNeighborAbove = hasAboveNeighborOfSameTime({
    messages,
    i,
  });

  const messageTimeFormat = () => {
    const today = DateTime.fromISO(new Date().toISOString()).toLocaleString();
    const messageDate = DateTime.fromISO(
      messages[i].createdAt
    ).toLocaleString();

    const yearMonthDayHourMinute = DateTime.fromISO(
      messages[i].createdAt
    ).toLocaleString({
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hourCycle: "h23",
    });
    const dayHourMinute = DateTime.fromISO(
      messages[i].createdAt
    ).toLocaleString({
      hour: "2-digit",
      minute: "2-digit",
      hourCycle: "h23",
    });

    if (today !== messageDate) {
      return yearMonthDayHourMinute;
    } else {
      return dayHourMinute;
    }
  };

  return (
    <>
      {!hasNeighborAbove && (
        <div className="chat-message-date-wrapper">
          <p className="chat-message-date">{messageTimeFormat()}</p>
          <div className="chat-message-date-divider" />
        </div>
      )}
    </>
  );
};

export default ChatDate;
