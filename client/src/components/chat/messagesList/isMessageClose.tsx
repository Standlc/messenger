import { Message } from "../../../ChatApp";
import { DateTime } from "luxon";

export const hasCloseNeighbor = ({
  order,
  messages,
  i,
}: {
  order: string;
  messages: Message[];
  i: number;
}) => {
  const neighborMessage = order === "next" ? messages[i - 1] : messages[i + 1];

  const isNeighborOwnMessage =
    neighborMessage?.userInfos._id === messages[i]?.userInfos._id;

  if (!neighborMessage || !isNeighborOwnMessage) return false;

  const neighborMessageDate = neighborMessage?.createdAt;

  const messageDate = messages[i].createdAt;

  const time = (messageCreatedAt: string, dateType: string) => {
    const table = {
      year: DateTime.fromISO(messageCreatedAt).toLocaleString({
        year: "2-digit",
      }),
      month: DateTime.fromISO(messageCreatedAt).toLocaleString({
        month: "2-digit",
      }),
      day: DateTime.fromISO(messageCreatedAt).toLocaleString({
        day: "2-digit",
      }),
      hour: DateTime.fromISO(messageCreatedAt).toLocaleString({
        hour: "2-digit",
        hourCycle: "h23",
      }),
    };
    const isValidDateType =
      dateType === "year" ||
      dateType === "month" ||
      dateType === "day" ||
      dateType === "hour";

    return table[isValidDateType ? dateType : "year"];
  };

  if (order === "next") {
    if (time(messageDate, "year") < time(neighborMessageDate, "year")) return;

    if (time(messageDate, "month") < time(neighborMessageDate, "month")) return;

    if (time(messageDate, "day") < time(neighborMessageDate, "day")) return;

    if (time(messageDate, "hour") < time(neighborMessageDate, "hour")) return;

    return !(time(messageDate, "minute") < time(neighborMessageDate, "minute"));
  } else {
    if (time(messageDate, "year") > time(neighborMessageDate, "year")) return;

    if (time(messageDate, "month") > time(neighborMessageDate, "month")) return;

    if (time(messageDate, "day") > time(neighborMessageDate, "day")) return;

    if (time(messageDate, "hour") > time(neighborMessageDate, "hour")) return;

    return !(time(messageDate, "minute") > time(neighborMessageDate, "minute"));
  }
};
