import { createContext } from "react";
import UserProfile, { Follow } from "../models/UserProfile";

export interface FollowContextModel {
  following: UserProfile[];
  followers: UserProfile[];
  friends: UserProfile[];
  handleFollowUser: (
    userUid: string,
    otherUid: string
  ) => Promise<Follow | void>;
  handleUnfollowUser: (userUid: string, otherUid: string) => Promise<void>;
}

const defaultValue: FollowContextModel = {
  following: [],
  followers: [],
  friends: [],
  handleFollowUser: async () => {},
  handleUnfollowUser: async () => {},
};

const FollowContext = createContext(defaultValue);
export default FollowContext;
