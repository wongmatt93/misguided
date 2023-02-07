import { createContext } from "react";
import Trip from "../models/Trip";
import UserProfile from "../models/UserProfile";

export interface AuthContextModel {
  userProfile: UserProfile | undefined;
  userTrips: Trip[];
  setUserProfile: React.Dispatch<React.SetStateAction<UserProfile | undefined>>;
  refreshProfile: (uid: string) => Promise<void>;
}

const defaultValue: AuthContextModel = {
  userProfile: undefined,
  userTrips: [],
  setUserProfile: () => {},
  refreshProfile: async () => {},
};

const AuthContext = createContext(defaultValue);
export default AuthContext;
