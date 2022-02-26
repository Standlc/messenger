import React, { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { Chat } from "../../../ChatApp";
import { UserContext } from "../../../contexts/UserProvider";
import ProfilePicture from "../../profilePicture/ProfilePicture";
import "./sideBarChatItem.css";
import { format } from "timeago.js";

const SideBarConversationItem = ({ chat }: { chat: Chat }) => {
  const { user } = useContext(UserContext);
  const currentChatId = useParams().chatId;
  const isCurrentChat = chat._id === currentChatId;

  return (
    <Link className="Link" to={"/" + chat._id} style={{ marginBottom: "5px" }}>
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
          <p className="side-bar-chat-item-last-message">
            {chat.lastMessage?.content} •{" "}
            {chat.lastMessage && format(chat.lastMessage.createdAt)}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default SideBarConversationItem;
