import React from "react";
import { User } from "../types";

export interface UserContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

export const UserContext = React.createContext<UserContextType>(
  undefined as unknown as UserContextType
);
