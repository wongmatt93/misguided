import { createContext } from "react";
import { Trip } from "../models/Trip";
import UserProfile from "../models/UserProfile";

export interface AuthContextModel {
  firstTimeUser: boolean;
  setFirstTimeUser: React.Dispatch<React.SetStateAction<boolean>>;
  userProfile: UserProfile | undefined;
  setUserProfile: React.Dispatch<React.SetStateAction<UserProfile | undefined>>;
  refreshProfile: () => Promise<void>;
  currentTrip: Trip | null;
}

const defaultValue: AuthContextModel = {
  firstTimeUser: false,
  setFirstTimeUser: () => {},
  userProfile: undefined,
  setUserProfile: () => {},
  refreshProfile: async () => {},
  currentTrip: null,
};

const AuthContext = createContext(defaultValue);
export default AuthContext;
