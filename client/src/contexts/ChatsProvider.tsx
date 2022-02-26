import React from "react";
import { Chat } from "../types";

export interface ChatsContextType {
  chats: Chat[] | [];
  setChats: React.Dispatch<React.SetStateAction<Chat[] | []>>;
}

export const ChatsContext = React.createContext<ChatsContextType>(
  undefined as unknown as ChatsContextType
);
