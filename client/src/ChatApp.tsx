import axios from "axios";
import React, { useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";
import ConversationSideBar from "./components/sideBarConversationsList/SideBarConversationsList";
import { UserContext } from "./contexts/UserProvider";
import "./chatApp.css";
import MessagesList from "./components/chat/messagesList/MessagesList";
import ChatInput from "./components/chat/chatInput/ChatInput";
import { useParams } from "react-router-dom";
import ChatHeader from "./components/chat/chatHeader/ChatHeader";
// import moment from "moment";

export type User = {
  _id: string;
  username: string;
  email: string;
  profilePicture: string;
  createdAt: Date;
  updatedAt: Date;
  __v: 0;
};

export type Conversation = {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
  membersInfos: User[];
};

export type Message = {
  _id: string;
  content: string;
  userInfos: User;
  conversationID: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
};

const App = () => {
  // useEffect(() => {
  //   localStorage.setItem(
  //     "user",
  //     JSON.stringify({
  //       _id: "6216ade7d4ba9eda5415eb9c",
  //       username: "second",
  //       email: "secondEmail",
  //       profilePicture: "",
  //       createdAt: "2022-02-22T10:48:43.521+00:00",
  //       updatedAt: "2022-02-22T10:48:43.521+00:00",
  //       __v: 0,
  //     })
  //   );
  // }, []);
  const [user, setUser] = useState<User | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [currentConversation, setCurrentConversation] =
    useState<Conversation | null>(null);
  const currentConversationId = useParams().conversationId;

  useEffect(() => {
    const foundCurrentConversation = conversations.find(
      (conversation) => conversation._id === currentConversationId
    );
    if (!foundCurrentConversation) return;
    setCurrentConversation(foundCurrentConversation);
  }, [currentConversationId, conversations]);

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
      setMessages((prev) => [...prev, message]);
    });
  }, [socket]);
  //WEB SOCKET

  useEffect(() => {
    const getConversations = async () => {
      const res = await axios.get(
        `http://localhost:5050/api/conversations/${user?._id}`
      );
      setConversations(res.data);
    };
    getConversations();
  }, [user]);

  useEffect(() => {
    const getMessages = async () => {
      if (!currentConversationId) return;
      const res = await axios.get(
        `http://localhost:5050/api/messages/${currentConversationId}`
      );
      setMessages(res.data);
    };
    getMessages();
  }, [currentConversationId]);

  const sendMessage = async ({
    messageInput,
    setMessageInput,
  }: {
    messageInput: string;
    setMessageInput: React.Dispatch<React.SetStateAction<string>>;
  }) => {
    if (messageInput === "" || !currentConversation || !user) return;
    const res = await axios.post(
      `http://localhost:5050/api/messages/${currentConversation?._id}`,
      {
        content: messageInput,
        userID: user._id,
        conversationID: currentConversation._id,
      }
    );
    const membersIds = currentConversation.membersInfos.map(
      (member) => member._id
    );
    const receiversIds = membersIds.filter((id) => id !== user._id);
    const { userID, ...others } = res.data;
    const messageCopy = {
      ...others,
      userInfos: user,
    };
    socket?.emit("newMessage", {
      message: messageCopy,
      receiversIds: receiversIds,
    });
    setMessages([...messages, messageCopy]);
    setMessageInput("");
  };

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <div className="container">
        <ConversationSideBar conversations={conversations} />
        <div className="chat-box">
          <ChatHeader currentConversation={currentConversation} />
          <MessagesList messages={messages} />
          <ChatInput sendMessage={sendMessage} />
        </div>
      </div>
    </UserContext.Provider>
  );
};

export default App;
