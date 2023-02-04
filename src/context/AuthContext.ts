import { createContext } from "react";
import UserProfile from "../models/UserProfile";

export interface AuthContextModel {
  userProfile: UserProfile | undefined;
  setUserProfile: React.Dispatch<React.SetStateAction<UserProfile | undefined>>;
  refreshProfile: (uid: string) => Promise<void>;
  activeKey: string;
  setFriendsKey: () => void;
  setSearchKey: () => void;
}

const defaultValue: AuthContextModel = {
  userProfile: undefined,
  setUserProfile: () => {},
  refreshProfile: async () => {},
  activeKey: "",
  setFriendsKey: () => {},
  setSearchKey: () => {},
};

const AuthContext = createContext(defaultValue);
export default AuthContext;
