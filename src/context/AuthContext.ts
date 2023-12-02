import { createContext } from "react";
import { UserProfile } from "../models/UserProfile";

interface AuthContextModel {
  userProfile: UserProfile | null;
  firstTimeUser: boolean;
  firstTimeUid: string | null;
  firstTimeDisplayName: string | null;
  firstTimeEmail: string | null;
  firstTimePhoneNumber: string | null;
  setUserProfile: React.Dispatch<React.SetStateAction<UserProfile | null>>;
  setFirstTimeUser: React.Dispatch<React.SetStateAction<boolean>>;
  refreshProfile: (uid: string) => Promise<void>;
}

const defaultValues: AuthContextModel = {
  userProfile: null,
  firstTimeUser: false,
  firstTimeUid: null,
  firstTimeDisplayName: null,
  firstTimeEmail: null,
  firstTimePhoneNumber: null,
  setUserProfile: () => {},
  setFirstTimeUser: () => {},
  refreshProfile: async () => {},
};

const AuthContext = createContext(defaultValues);

export default AuthContext;
