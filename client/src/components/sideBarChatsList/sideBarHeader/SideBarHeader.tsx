import React, { useContext } from "react";
import SideBarSearchInput from "./sideBarSearchInput/SideBarSearchInput";
import "./sideBarHeader.css";
import { Add } from "@mui/icons-material";
import ProfilePicture from "../../profilePicture/ProfilePicture";
import { UserContext } from "../../../contexts/UserProvider";

const SideBarHeader = () => {
  const userContext = useContext(UserContext);
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

      <SideBarSearchInput />
    </div>
  );
};

export default SideBarHeader;
