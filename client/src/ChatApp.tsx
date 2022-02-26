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
    socket?.on("newMessage", (message) => {
      setMessages((prev) => [message, ...prev]);
      // setChats((prev) => [message, ...prev]);
    });
  }, [socket]);

  const emitNewMessageSocket = (message: Message, receiversIds: string[]) => {
    socket?.emit("newMessage", {
      message,
      receiversIds,
    });
  };

  const updateCurrentChatLastMessage = (
    message: Message,
    currentChat: Chat,
    chatsCopy: Chat[]
  ) => {
    currentChat.lastMessage = message;
    setChats([...chatsCopy]);
  };

  const sortMessages = (data: Message[]) => {
    setMessages(
      data.sort((m1: Message, m2: Message) => {
        return (
          new Date(m2.createdAt).valueOf() - new Date(m1.createdAt).valueOf()
        );
      })
    );
  };

  //GET CHATS
  useEffect(() => {
    const getChats = async () => {
      const res = await axios.get(
        `http://localhost:5050/api/chats/${user?._id}`
      );
      setChats(res.data);
    };
    getChats();
  }, [user]);

  //GET MESSAGES
  useEffect(() => {
    if (!currentChatParamsId) return;
    const getMessages = async () => {
      const res = await axios.get(
        `http://localhost:5050/api/messages/${currentChatParamsId}`
      );
      sortMessages(res.data);
    };
    getMessages();
  }, [currentChatParamsId]);

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
      <div className="container">
        <ChatSideBar chats={chats} />
        <div className="chat-box">
          <ChatHeader chats={chats} />
          <MessagesList messages={messages} />
          <ChatInput sendMessage={sendMessage} />
        </div>
      </div>
    </UserContext.Provider>
  );
};

export default App;
