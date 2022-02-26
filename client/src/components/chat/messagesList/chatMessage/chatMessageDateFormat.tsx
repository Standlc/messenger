import { DateTime } from "luxon";
import { Message } from "../../../../types";

export const chatMessageDateFormat = ({
  messages,
  i,
}: {
  messages: Message[];
  i: number;
}) => {
  const todayDate = DateTime.fromISO(new Date().toISOString()).toLocaleString();
  const messageDate = DateTime.fromISO(messages[i].createdAt).toLocaleString();

  const yearMonthDayHourMinuteFormat = DateTime.fromISO(
    messages[i].createdAt
  ).toLocaleString({
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  });
  const dayHourMinuteFormat = DateTime.fromISO(
    messages[i].createdAt
  ).toLocaleString({
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  });

  if (todayDate !== messageDate) {
    return yearMonthDayHourMinuteFormat;
  } else {
    return dayHourMinuteFormat;
  }
};
