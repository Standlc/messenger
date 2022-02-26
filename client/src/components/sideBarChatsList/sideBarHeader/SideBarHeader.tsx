import React, { useContext, useState } from "react";
import SideBarSearchInput from "./sideBarSearchInput/SideBarSearchInput";
import "./sideBarHeader.css";
import { Add } from "@mui/icons-material";
import ProfilePicture from "../../profilePicture/ProfilePicture";
import { UserContext } from "../../../contexts/UserProvider";
import ChatSideBarSearchResults from "./chatSideBarSearchResults/ChatSideBarSearchResults";

const SideBarHeader = () => {
  const userContext = useContext(UserContext);
  const [searchInput, setSearchInput] = useState("");

  return (
    <div className="side-bar-header-wrapper">
      <div className="side-bar-header-upper">
        <div className="side-bar-header-left">
          <ProfilePicture
            members={userContext?.user && [userContext?.user]}
            size="medium"
          />
          <h1 className="side-bar-header-title">Chats</h1>
        </div>

        <div className="side-bar-header-options-wrapper">
          <div className="side-bar-header-option">
            <Add />
          </div>
        </div>
      </div>

      <SideBarSearchInput
        searchInput={searchInput}
        setSearchInput={setSearchInput}
      />

      <ChatSideBarSearchResults searchInput={searchInput} />
      <div className="side-bar-header-divider" />
    </div>
  );
};

export default SideBarHeader;
