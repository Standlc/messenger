import { Chat } from "./types";

export const sortedChatsByLastMessage = ({ chats }: { chats: Chat[] }) => {
  const chatsWithoutLastMessage = chats.filter(
    (chat) => !chat.lastMessage && chat
  );
  const chatsWithLastMessage = chats.filter((chat) => chat.lastMessage && chat);
  const sortedChatsWithoutLastMessage = chatsWithoutLastMessage.sort(
    (c1: Chat, c2: Chat) =>
      new Date(c2.createdAt).valueOf() - new Date(c1.createdAt).valueOf()
  );
  const sortedChatsWithLastMessage = chatsWithLastMessage.sort(
    (c1: Chat, c2: Chat) => {
      if (c2.lastMessage && c1.lastMessage)
        return (
          new Date(c2.lastMessage.createdAt).valueOf() -
          new Date(c1.lastMessage.createdAt).valueOf()
        );
      else return 0;
    }
  );
  const sortedChats = [
    ...sortedChatsWithLastMessage,
    ...sortedChatsWithoutLastMessage,
  ];
  return sortedChats;
};
