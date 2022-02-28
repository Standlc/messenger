import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import ChatMessagesSkeleton from "../../../skeletons/chatMessagesSkeleton/ChatMessagesSkeleton";
import { Message } from "../../../types";
import ChatMessage from "./chatMessage/ChatMessage";
import "./messagesList.css";

const MessagesList = ({
  messages,
  setMessages,
}: {
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
}) => {
  const currentChatParamsId = useParams().chatId;
  const chatMessagesWrapperRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);

  const sortMessages = (messages: Message[]) => {
    setMessages(
      messages.sort((m1: Message, m2: Message) => {
        return (
          new Date(m2.createdAt).valueOf() - new Date(m1.createdAt).valueOf()
        );
      })
    );
  };

  const fetchMessagesWhenReachingTop = () => {
    const chatMessageRefCurrent = chatMessagesWrapperRef.current;
    if (!chatMessageRefCurrent) return;
    const scrollableHeight =
      chatMessageRefCurrent.scrollHeight -
      chatMessageRefCurrent.getBoundingClientRect().height;
    const hasReachedTop = () => {
      if (scrollableHeight + chatMessageRefCurrent.scrollTop > 0) return false;
      else return true;
    };
    // console.log(hasReachedTop());
  };

  useEffect(() => {
    if (!currentChatParamsId) return;
    setLoading(true);
    const getMessages = async () => {
      const res = await axios.get(
        `http://localhost:5050/api/messages/${currentChatParamsId}`
      );
      sortMessages(res.data);
      setLoading(false);
    };
    getMessages();
  }, [currentChatParamsId]);

  return (
    <div className="chat-messages-list-container">
      <div
        onScroll={fetchMessagesWhenReachingTop}
        ref={chatMessagesWrapperRef}
        className="chat-messages-list-wrapper"
      >
        {loading ? (
          <ChatMessagesSkeleton />
        ) : (
          messages.map((message, i) => (
            <ChatMessage key={message._id} messages={messages} i={i} />
          ))
        )}
      </div>
    </div>
  );
};

export default MessagesList;
