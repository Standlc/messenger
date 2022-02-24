import React, { useContext } from "react";
import { Conversation } from "../../ChatApp";
import { UserContext } from "../../contexts/UserProvider";
import SideBarConversationItem from "./sideBarItem/SideBarConversationItem";
import "./sideBarConversationsList.css";
import SideBarSearchInput from "./sideBarHeader/sideBarSearchInput/SideBarSearchInput";
import SideBarHeader from "./sideBarHeader/SideBarHeader";

const ConversationSideBar = ({
  conversations,
}: {
  conversations: Conversation[];
}) => {
  const userContext = useContext(UserContext);

  return (
    <div className="side-bar-conversations-list-container">
      <SideBarHeader />
      <div className="side-bar-conversations-list-wrapper">
        {conversations.map((conversation) => (
          <SideBarConversationItem
            key={conversation._id}
            conversation={conversation}
          />
        ))}
      </div>
    </div>
  );
};

export default ConversationSideBar;
