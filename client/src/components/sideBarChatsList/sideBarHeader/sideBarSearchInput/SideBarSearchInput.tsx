import React, { useState } from "react";
import "./sideBarSearchInput.css";

const SideBarSearchInput = ({
  searchInput,
  setSearchInput,
}: {
  searchInput: string;
  setSearchInput: React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <div className="side-bar-search-input-wrapper">
      <input
        placeholder="Search a conversation..."
        className="side-bar-search-input"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
      />
    </div>
  );
};

export default SideBarSearchInput;
