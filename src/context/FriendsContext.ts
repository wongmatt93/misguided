import { createContext } from "react";
import UserProfile, { Friend } from "../models/UserProfile";

export interface FriendsContextModel {
  friends: UserProfile[];
  friendRequests: UserProfile[];
  activeKey: string;
  setFriendsKey: () => void;
  setSearchKey: () => void;
  handleAcceptFriend: (
    userUid: string,
    otherUid: string
  ) => Promise<Friend | void>;
  handleDeleteFriend: (userUid: string, otherUid: string) => Promise<void>;
}

const defaultValue: FriendsContextModel = {
  friends: [],
  friendRequests: [],
  activeKey: "",
  setFriendsKey: () => {},
  setSearchKey: () => {},
  handleAcceptFriend: async () => {},
  handleDeleteFriend: async () => {},
};

const FriendsContext = createContext(defaultValue);
export default FriendsContext;
