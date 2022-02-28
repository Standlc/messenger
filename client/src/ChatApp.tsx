import axios from "axios";
import React, { useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";
import ChatSideBar from "./components/sideBarChatsList/ChatSideBar";
import { UserContext } from "./contexts/UserProvider";
import "./chatApp.css";
import MessagesList from "./components/chat/messagesList/MessagesList";
import ChatInput from "./components/chat/chatInput/ChatInput";
import { useParams } from "react-router-dom";
import ChatHeader from "./components/chat/chatHeader/ChatHeader";
import { Chat, Message, User } from "./types";
import { ChatsContext } from "./contexts/ChatsProvider";
import { sortedChatsByLastMessage } from "./sortedChats";

const App = () => {
  const [user, setUser] = useState<User | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [chats, setChats] = useState<Chat[]>([]);
  const currentChatParamsId = useParams().chatId;

  //GET USER
  useEffect(() => {
    const userJson = localStorage.getItem("user");
    userJson && setUser(JSON.parse(userJson));
  }, []);

  //WEB SOCKET
  const [socket, setSocket] = useState<Socket | null>(null);
  useEffect(() => {
    setSocket(io("http://localhost:8080"));
  }, []);

  useEffect(() => {
    socket?.emit("newUser", user?._id);
  }, [socket, user]);

  useEffect(() => {
    const handler = (message: any) => {
      setMessages((prev) => [message, ...prev]);
      const chatsCopy = [...chats];
      const currentChat = chatsCopy.find(
        (chat) => chat._id === currentChatParamsId
      );
      updateCurrentChatLastMessage(message, currentChat, chatsCopy);
    };
    socket?.on("newMessage", handler);
    return () => {
      socket?.off("newMessage", handler);
    };
  }, [socket, chats]);

  const emitNewMessageSocket = (message: Message, receiversIds: string[]) => {
    socket?.emit("newMessage", {
      message,
      receiversIds,
    });
  };

  const updateCurrentChatLastMessage = (
    message: Message,
    currentChat: Chat | undefined,
    chatsCopy: Chat[]
  ) => {
    if (!currentChat) return;
    currentChat.lastMessage = message;
    setChats(sortedChatsByLastMessage({ chats: chatsCopy }));
  };

  //GET CHATS
  useEffect(() => {
    const getChats = async () => {
      const res = await axios.get(
        `http://localhost:5050/api/chats/${user?._id}`
      );
      setChats(sortedChatsByLastMessage({ chats: res.data }));
    };
    getChats();
  }, [user]);

  //SEND MESSAGE
  const sendMessage = async ({
    messageInput,
    setMessageInput,
  }: {
    messageInput: string;
    setMessageInput: React.Dispatch<React.SetStateAction<string>>;
  }) => {
    if (messageInput === "" || !user) return;
    const res = await axios.post(
      `http://localhost:5050/api/messages/${currentChatParamsId}`,
      {
        content: messageInput,
        userId: user._id,
        chatId: currentChatParamsId,
      }
    );
    const chatsCopy = [...chats];
    const currentChat = chatsCopy.find(
      (chat) => chat._id === currentChatParamsId
    );
    if (!currentChat) return;
    const membersIds = currentChat.membersInfos.map((member) => member._id);
    const receiversIds = membersIds.filter((id) => id !== user._id);
    const { userId, ...others } = res.data;
    const messageCopy = {
      ...others,
      userInfos: user,
    };
    emitNewMessageSocket(messageCopy, receiversIds);
    updateCurrentChatLastMessage(messageCopy, currentChat, chatsCopy);
    setMessages([messageCopy, ...messages]);
    setMessageInput("");
  };

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <ChatsContext.Provider value={{ chats, setChats }}>
        <div className="container">
          <ChatSideBar />
          <div className="chat-box">
            <ChatHeader />
            <MessagesList messages={messages} setMessages={setMessages} />
            <ChatInput sendMessage={sendMessage} />
          </div>
        </div>
      </ChatsContext.Provider>
    </UserContext.Provider>
  );
};

export default App;
