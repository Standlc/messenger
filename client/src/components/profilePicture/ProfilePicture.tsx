import React from "react";
import { User } from "../../types";
import "./profilePicture.css";

const classNames = {
  small: "chat-PP initials small",
  medium: "chat-PP initials medium",
  large: "chat-PP initials large",
};

const ProfilePicture = ({
  members,
  size,
  absolute,
}: {
  members: User[] | null | undefined;
  size?: string;
  absolute?: boolean;
}) => {
  const sizeIsValid = size === "small" || size === "medium" || size === "large";
  const className = () => {
    return sizeIsValid ? classNames[size] : "";
  };

  return (
    <div className={absolute ? "chat-PP-wrapper-absolute" : "chat-wrapper-PP"}>
      {members?.map((member) => {
        return (
          <div key={member._id} className={size}>
            {member.profilePicture ? (
              <img alt="" className="chat-PP" src={member.profilePicture} />
            ) : (
              <div className={className()}>
                {member.username[0].toUpperCase()}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ProfilePicture;
