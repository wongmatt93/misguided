import { ReactNode, useEffect, useState } from "react";
import { UserProfile } from "../models/UserProfile";
import { auth } from "../firebaseConfig";
import AuthContext from "./AuthContext";
import { getUserProfileByUid } from "../services/userProfileServices";
import { getCurrentDateString } from "../utils/dateFunctions";

interface Props {
  children: ReactNode;
}

const AuthContextProvider = ({ children }: Props) => {
  // variables
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  // functions
  const refreshProfile = async (): Promise<void> =>
    setUserProfile(
      await getUserProfileByUid(userProfile!.uid, getCurrentDateString)
    );

  useEffect(() => {
    return auth.onAuthStateChanged((newUser) => {
      if (newUser) {
        getUserProfileByUid(newUser.uid, getCurrentDateString).then(
          (response) => {
            if (response) {
              setUserProfile(response);
            }
          }
        );
      }
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{ userProfile, setUserProfile, refreshProfile }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
