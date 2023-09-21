import { createContext } from "react";
import { NewUserTemplate, UserProfile } from "../models/UserProfile";

interface AuthContextModel {
  userProfile: UserProfile | null;
  firstTimeUser: NewUserTemplate | null;
  setUserProfile: React.Dispatch<React.SetStateAction<UserProfile | null>>;
  setFirstTimeUser: React.Dispatch<
    React.SetStateAction<NewUserTemplate | null>
  >;
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
