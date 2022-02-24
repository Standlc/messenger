import React from "react";
import { User } from "../../ChatApp";
import "./profilePicture.css";

const ProfilePicture = ({
  members,
  size,
}: {
  members: User[] | null | undefined;
  size: string;
}) => {
  const classNames = {
    small: "side-bar-conversation-item-PP initials small",
    medium: "side-bar-conversation-item-PP initials medium",
    large: "side-bar-conversation-item-PP initials large",
  };
  const sizeIsValid = size === "small" || size === "medium" || size === "large";

  return (
    <div>
      {members?.map((member) => {
        return (
          <div key={member._id} className={size}>
            {member.profilePicture ? (
              <img
                alt=""
                className="side-bar-conversation-item-PP"
                src={member.profilePicture}
              />
            ) : (
              <div className={sizeIsValid ? classNames[size] : ""}>
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
