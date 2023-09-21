import { ReactNode, useEffect, useState } from "react";
import { NewUserTemplate, UserProfile } from "../models/UserProfile";
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
  const [firstTimeUser, setFirstTimeUser] = useState<NewUserTemplate | null>(
    null
  );

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
              const newUserProfile: NewUserTemplate = {
                uid: user.uid,
                username: null,
                displayName: user.displayName,
                email: user.email,
                phoneNumber: user.phoneNumber,
                photoURL: null,
                hometownId: null,
                preferences: null,
                followingUids: [],
                favoriteCityIds: [],
                hiddenCityIds: [],
                notifications: [],
              };
              setFirstTimeUser(newUserProfile);
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
