import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Chat } from "../../../types";
import ProfilePicture from "../../profilePicture/ProfilePicture";
import "./sideBarChatItem.css";
import { format } from "timeago.js";
import { MoreVert } from "@mui/icons-material";

const SideBarConversationItem = ({ chat }: { chat: Chat }) => {
  const currentChatParamsId = useParams().chatId;
  const [isCurrentChat, setIsCurrentChat] = useState(
    chat._id === currentChatParamsId
  );
  useEffect(() => {
    setIsCurrentChat(chat._id === currentChatParamsId);
  }, [currentChatParamsId]);

  const handleOptionsClick = (e: any) => {
    e.preventDefault();
  };

  return (
    <Link className="Link" to={"/" + chat._id} style={{ position: "relative" }}>
      <div
        className={
          isCurrentChat ? "side-bar-chat-item current" : "side-bar-chat-item"
        }
      >
        <ProfilePicture
          key={chat._id}
          members={chat.membersInfos}
          size="large"
        />
        <div className="side-bar-chat-item-infos">
          <h1 className="side-bar-members-usernames">
            {chat.membersInfos.map((member) => {
              return member.username;
            })}
          </h1>

          {chat.lastMessage && (
            <p className="side-bar-chat-item-last-message">
              {chat.lastMessage.content.length > 20
                ? chat.lastMessage.content.slice(0, 30) + "..."
                : chat.lastMessage.content}
              <span className="side-bar-chat-last-message-date">
                {" "}
                • {format(chat.lastMessage.createdAt)}
              </span>
            </p>
          )}
        </div>
        <div
          onClick={handleOptionsClick}
          className="chat-side-bar-otpions-button"
        >
          <MoreVert />
        </div>
      </div>
      <div className="side-bar-chat-item-divider " />
    </Link>
  );
};

export default SideBarConversationItem;
