import { Message } from "../../../../types";

export const scrollIntoView = ({
  messageRef,
  messages,
  i,
}: {
  messageRef: React.RefObject<HTMLDivElement>;
  messages: Message[];
  i: number;
}) => {
  if (messages[i]._id === messages[0]._id)
    messageRef.current?.scrollIntoView({
      behavior: "smooth",
    });
};
