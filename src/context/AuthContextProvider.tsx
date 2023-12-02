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
  const [firstTimeUid, setFirstTimeUid] = useState<string | null>(null);
  const [firstTimeDisplayName, setFirstTimeDisplayName] = useState<
    string | null
  >(null);
  const [firstTimeEmail, setFirstTimeEmail] = useState<string | null>(null);
  const [firstTimePhoneNumber, setFirstTimePhoneNumber] = useState<
    string | null
  >(null);
  const [firstTimeUser, setFirstTimeUser] = useState<boolean>(false);

  // functions
  const refreshProfile = async (uid: string): Promise<void> =>
    setUserProfile(await getUserProfileByUid(uid, getCurrentDateString));

  useEffect(() => {
    return auth.onAuthStateChanged((user) => {
      if (user) {
        getUserProfileByUid(user.uid, getCurrentDateString).then(
          (userProfile) => {
            if (userProfile) {
              setUserProfile(userProfile);
            } else {
              setFirstTimeUid(user.uid);
              setFirstTimeDisplayName(user.displayName);
              setFirstTimeEmail(user.email);
              setFirstTimePhoneNumber(user.phoneNumber);
              setFirstTimeUser(true);
            }
          }
        );
      }
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        userProfile,
        firstTimeUser,
        firstTimeUid,
        firstTimeDisplayName,
        firstTimeEmail,
        firstTimePhoneNumber,
        setUserProfile,
        setFirstTimeUser,
        refreshProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
