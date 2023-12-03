import { createContext } from "react";
import { NewUser, UserProfile } from "../models/UserProfile";

interface AuthContextModel {
  userProfile: UserProfile | null;
  firstTimeUser: NewUser | null;
  setUserProfile: React.Dispatch<React.SetStateAction<UserProfile | null>>;
  setFirstTimeUser: React.Dispatch<React.SetStateAction<NewUser | null>>;
  refreshProfile: (uid: string) => Promise<void>;
}

const defaultValues: AuthContextModel = {
  userProfile: null,
  firstTimeUser: null,
  setUserProfile: () => {},
  setFirstTimeUser: () => {},
  refreshProfile: async () => {},
};

const AuthContext = createContext(defaultValues);

export default AuthContext;
