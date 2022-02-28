export type User = {
  _id: string;
  username: string;
  email: string;
  profilePicture: string;
  createdAt: string;
  updatedAt: string;
};
export type Message = {
  _id: string;
  content: string;
  userInfos: User;
  chatId: string;
  createdAt: string;
  updatedAt: string;
};
export interface Chat {
  _id: string;
  createdAt: string;
  updatedAt: string;
  membersInfos: User[];
  lastMessage?: Message | null;
}
