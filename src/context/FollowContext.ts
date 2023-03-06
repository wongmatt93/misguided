import { createContext } from "react";
import UserProfile from "../models/UserProfile";

export interface FollowContextModel {
  following: UserProfile[];
  friends: UserProfile[];
}

const defaultValue: FollowContextModel = {
  following: [],
  friends: [],
};

const FollowContext = createContext(defaultValue);
export default FollowContext;
