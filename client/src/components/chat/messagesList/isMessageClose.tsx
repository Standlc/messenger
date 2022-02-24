import moment from "moment";
import { Message } from "../../../ChatApp";

export const hasCloseNeighbor = ({
  order,
  messages,
  i,
}: {
  order: string;
  messages: Message[];
  i: number;
}) => {
  const neighborMessage = order === "next" ? messages[i + 1] : messages[i - 1];
  const neighborMessageTime =
    order === "next" ? neighborMessage?.createdAt : neighborMessage?.createdAt;
  const currentMessageTime = messages[i].createdAt;
  const isNeighborMessageOwn =
    neighborMessage?.userInfos._id === messages[i]?.userInfos._id;

  if (!neighborMessage || !neighborMessageTime || !isNeighborMessageOwn)
    return false;
  //   const dateTypes = ["year", "month", "day", "hour", "minute"];

  const time = (messageCreatedAt: Date, dateType: string) => {
    const table = {
      year: moment(messageCreatedAt).format().substring(0, 4),
      month: moment(messageCreatedAt).format().substring(5, 7),
      day: moment(messageCreatedAt).format().substring(8, 10),
      hour: moment(messageCreatedAt).format().substring(11, 13),
      minute: moment(messageCreatedAt).format().substring(14, 16),
    };
    const isValidDateType =
      dateType === "year" ||
      dateType === "month" ||
      dateType === "day" ||
      dateType === "hour" ||
      dateType === "minute";

    return table[isValidDateType ? dateType : "year"];
  };

  if (order === "next") {
    if (time(currentMessageTime, "year") < time(neighborMessageTime, "year"))
      return;

    if (time(currentMessageTime, "month") < time(neighborMessageTime, "month"))
      return;

    if (time(currentMessageTime, "day") < time(neighborMessageTime, "day"))
      return;

    if (time(currentMessageTime, "hour") < time(neighborMessageTime, "hour"))
      return;

    return !(
      time(currentMessageTime, "minute") < time(neighborMessageTime, "minute")
    );
  } else {
    if (time(currentMessageTime, "year") > time(neighborMessageTime, "year"))
      return;

    if (time(currentMessageTime, "month") > time(neighborMessageTime, "month"))
      return;

    if (time(currentMessageTime, "day") > time(neighborMessageTime, "day"))
      return;

    if (time(currentMessageTime, "hour") > time(neighborMessageTime, "hour"))
      return;

    return !(
      time(currentMessageTime, "minute") > time(neighborMessageTime, "minute")
    );
  }
};
