import axios from "axios";
import { Chat, User } from "../../../types";

export const sendMessage = async ({
  messageInput,
  setMessageInput,
  chats,
  user,
  currentChatId,
}: {
  messageInput: string;
  setMessageInput: React.Dispatch<React.SetStateAction<string>>;
  chats: Chat[];
  user: User | null;
  currentChatId: string | undefined;
}) => {
  if (messageInput === "" || !user || !currentChatId) return;
  const res = await axios.post(
    `http://localhost:5050/api/messages/${currentChatId}`,
    {
      content: messageInput,
      userId: user._id,
      chatId: currentChatId,
    }
  );
  const chatsCopy = [...chats];
  const currentChat = chatsCopy.find((chat) => chat._id === currentChatId);
  if (!currentChat) return;
  const membersIds = currentChat.membersInfos.map((member) => member._id);
  const receiversIds = membersIds.filter((id) => id !== user._id);
  const { userId, ...others } = res.data;
  const messageCopy = {
    ...others,
    userInfos: user,
  };
  //   emitNewMessageSocket(messageCopy, receiversIds);
  //   updateCurrentChatLastMessage(messageCopy, currentChat, chatsCopy);
  //   setMessages([messageCopy, ...messages]);
  setMessageInput("");
};
