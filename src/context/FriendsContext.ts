import { createContext } from "react";
import { Friend } from "../models/UserProfile";

export interface FriendsContextModel {
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
  activeKey: "",
  setFriendsKey: () => {},
  setSearchKey: () => {},
  handleAcceptFriend: async () => {},
  handleDeleteFriend: async () => {},
};

const FriendsContext = createContext(defaultValue);
export default FriendsContext;
