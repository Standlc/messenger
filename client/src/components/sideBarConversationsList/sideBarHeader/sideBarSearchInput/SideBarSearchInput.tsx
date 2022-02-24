import React from "react";
import "./sideBarSearchInput.css";

const SideBarSearchInput = () => {
  return (
    <div className="side-bar-search-input-wrapper">
      <input
        placeholder="Search a conversation..."
        className="side-bar-search-input"
      />
    </div>
  );
};

export default SideBarSearchInput;
