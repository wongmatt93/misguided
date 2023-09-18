import { createContext } from "react";
import { UserProfile } from "../models/UserProfile";

interface AuthContextModel {
  userProfile: UserProfile | null;
  setUserProfile: React.Dispatch<React.SetStateAction<UserProfile | null>>;
  refreshProfile: () => Promise<void>;
}

const defaultValues: AuthContextModel = {
  userProfile: null,
  setUserProfile: () => {},
  refreshProfile: async () => {},
};

const AuthContext = createContext(defaultValues);

export default AuthContext;
