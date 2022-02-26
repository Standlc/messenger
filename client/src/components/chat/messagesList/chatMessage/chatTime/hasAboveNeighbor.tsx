import { DateTime } from "luxon";
import { Message } from "../../../../../types";

export const hasAboveNeighborOfSameTime = ({
  messages,
  i,
}: {
  messages: Message[];
  i: number;
}) => {
  //THE LIST OF MESSAGES IS INVERTED TO DISPLAY LAST MESSAGE ON PAGE LOAD
  const messageAbove = messages[i + 1];
  if (!messageAbove) return false;

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

  if (
    time(messages[i].createdAt, "year") > time(messageAbove.createdAt, "year")
  )
    return;
  if (
    time(messages[i].createdAt, "month") > time(messageAbove.createdAt, "month")
  )
    return;
  if (time(messages[i].createdAt, "day") > time(messageAbove.createdAt, "day"))
    return;
  return !(
    time(messages[i].createdAt, "hour") > time(messageAbove.createdAt, "hour")
  );
};
