import { Message } from "../../../../types";
import { DateTime } from "luxon";
import { RefObject } from "react";

export const groupChatMessage = ({
  messages,
  i,
  messageRef,
  isOwnMessage,
}: {
  messages: Message[];
  i: number;
  messageRef: RefObject<HTMLDivElement>;
  isOwnMessage: boolean;
}) => {
  const message = messages[i];
  const messageAbove = messages[i + 1];
  const messageBelow = messages[i - 1];
  const messageRefCurrent = messageRef.current;
  if (!messageRefCurrent) return;

  const surroundedStyle = () => {
    return isOwnMessage
      ? ((messageRefCurrent.style.borderTopRightRadius = "5px"),
        (messageRefCurrent.style.borderBottomRightRadius = "5px"))
      : ((messageRefCurrent.style.borderTopLeftRadius = "5px"),
        (messageRefCurrent.style.borderBottomLeftRadius = "5px"));
  };
  const borderBottomStyle = () => {
    return isOwnMessage
      ? (messageRefCurrent.style.borderBottomRightRadius = "5px")
      : (messageRefCurrent.style.borderBottomLeftRadius = "5px");
  };
  const borderTopStyle = () => {
    return isOwnMessage
      ? (messageRefCurrent.style.borderTopRightRadius = "5px")
      : (messageRefCurrent.style.borderTopLeftRadius = "5px");
  };

  const assigningStyles = () => {
    if (
      hasNeighborAbove({ message, messageAbove }) &&
      hasNeighborBelow({ message, messageBelow })
    )
      surroundedStyle();
    if (
      hasNeighborAbove({ message, messageAbove }) &&
      !hasNeighborBelow({ message, messageBelow })
    )
      borderTopStyle();
    if (
      !hasNeighborAbove({ message, messageAbove }) &&
      hasNeighborBelow({ message, messageBelow })
    )
      borderBottomStyle();
  };
  assigningStyles();
};

export const time = (messageCreatedAt: string, dateType: string) => {
  const Date = DateTime.fromISO(messageCreatedAt);
  const timeTable = {
    year: Date.toLocaleString({
      year: "2-digit",
    }),
    month: Date.toLocaleString({
      month: "2-digit",
    }),
    day: Date.toLocaleString({
      day: "2-digit",
    }),
    hour: Date.toLocaleString({
      hour: "2-digit",
      hourCycle: "h23",
    }),
  };
  const isValidDateType =
    dateType === "year" ||
    dateType === "month" ||
    dateType === "day" ||
    dateType === "hour";

  return parseInt(timeTable[isValidDateType ? dateType : "hour"]);
};

export const hasNeighborBelow = ({
  message,
  messageBelow,
}: {
  message: Message;
  messageBelow: Message;
}) => {
  if (!messageBelow || messageBelow.userInfos._id !== message.userInfos._id)
    return false;
  const messageBelowDate = messageBelow.createdAt;
  const messageDate = message.createdAt;

  if (time(messageDate, "year") < time(messageBelowDate, "year")) return;
  if (time(messageDate, "month") < time(messageBelowDate, "month")) return;
  if (time(messageDate, "day") < time(messageBelowDate, "day")) return;
  return !(time(messageDate, "hour") < time(messageBelowDate, "hour"));
};

export const hasNeighborAbove = ({
  message,
  messageAbove,
  groupAll,
}: {
  message: Message;
  messageAbove: Message;
  groupAll?: boolean;
}) => {
  if (
    !messageAbove ||
    (!groupAll && messageAbove.userInfos._id !== message.userInfos._id)
  )
    return false;

  const messageAboveDate = messageAbove.createdAt;
  const messageDate = message.createdAt;

  if (time(messageDate, "year") > time(messageAboveDate, "year")) return;
  if (time(messageDate, "month") > time(messageAboveDate, "month")) return;
  if (time(messageDate, "day") > time(messageAboveDate, "day")) return;
  return !(time(messageDate, "hour") > time(messageAboveDate, "hour"));
};
