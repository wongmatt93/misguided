import { ReactNode, useEffect, useState } from "react";
import { NewUser, UserProfile } from "../models/UserProfile";
import { auth } from "../firebaseConfig";
import AuthContext from "./AuthContext";
import { getUserProfileByUid } from "../services/userProfileServices";

interface Props {
  children: ReactNode;
}

const AuthContextProvider = ({ children }: Props) => {
  // variables
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [firstTimeUser, setFirstTimeUser] = useState<NewUser | null>(null);

  // functions
  const refreshProfile = async (uid: string): Promise<void> =>
    setUserProfile(await getUserProfileByUid(uid));

  useEffect(() => {
    return auth.onAuthStateChanged((user) => {
      if (user) {
        getUserProfileByUid(user.uid).then((userProfile) => {
          if (userProfile) {
            setUserProfile(userProfile);
          } else {
            const { uid, displayName, email, phoneNumber } = user;
            const newUser: NewUser = {
              uid,
              username: "",
              displayName,
              email,
              phoneNumber,
              photoURL: "",
              hometownId: "",
              preferences: null,
              followingUids: [],
              favoriteCityIds: [],
              hiddenCityIds: [],
              notifications: [],
            };
            setFirstTimeUser(newUser);
          }
        });
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
