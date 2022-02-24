import React, { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { Conversation } from "../../../ChatApp";
import { UserContext } from "../../../contexts/UserProvider";
import ProfilePicture from "../../profilePicture/ProfilePicture";
import "./sideBarConversationItem.css";

const SideBarConversationItem = ({
  conversation,
}: {
  conversation: Conversation;
}) => {
  const userContext = useContext(UserContext);
  const currentConversatonId = useParams().conversationId;

  return (
    <Link
      className="Link"
      to={"/" + conversation._id}
      style={{ marginBottom: "5px" }}
    >
      <div
        className={
          conversation._id === currentConversatonId
            ? "side-bar-conversation-item current"
            : "side-bar-conversation-item"
        }
      >
        <ProfilePicture
          key={conversation._id}
          members={conversation.membersInfos}
          size="large"
        />
        <div className="side-bar-conversation-item-infos">
          <h1 className="side-bar-members-usernames">
            {conversation.membersInfos.map((member) => {
              return member.username;
            })}
          </h1>
          <p className="side-bar-conversation-item-last-message">
            bla bla bla...
          </p>
        </div>
      </div>
    </Link>
  );
};

export default SideBarConversationItem;
