import { createContext } from "react";
import UserProfile from "../models/UserProfile";

export interface AuthContextModel {
  userProfile: UserProfile | undefined;
  setUserProfile: React.Dispatch<React.SetStateAction<UserProfile | undefined>>;
  refreshProfile: () => Promise<void>;
}

const defaultValue: AuthContextModel = {
  userProfile: undefined,
  setUserProfile: () => {},
  refreshProfile: async () => {},
};

const AuthContext = createContext(defaultValue);
export default AuthContext;
