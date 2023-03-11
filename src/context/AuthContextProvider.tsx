import { ReactNode, useEffect, useState } from "react";
import { auth } from "../firebaseConfig";
import AuthContext from "./AuthContext";
import UserProfile from "../models/UserProfile";
import { addNewUser, getUserByUid } from "../services/userService";

interface Props {
  children: ReactNode;
}

const AuthContextProvider = ({ children }: Props) => {
  const [userProfile, setUserProfile] = useState<UserProfile | undefined>(
    undefined
  );

  const refreshProfile = async (): Promise<void> =>
    setUserProfile(await getUserByUid(userProfile!.uid));

  useEffect(() => {
    // useEffect to only register once at start
    return auth.onAuthStateChanged((newUser) => {
      //setUserProfile(users.find((user) => user.email === newUser!.email));
      if (newUser) {
        getUserByUid(newUser.uid).then((response) => {
          if (!response) {
            const newUserProfile: UserProfile = {
              uid: newUser.uid,
              username: null,
              displayName: newUser.displayName,
              email: newUser.email,
              phoneNumber: newUser.phoneNumber,
              photoURL: null,
              hometownId: null,
              preferences: null,
              followersUids: [],
              followingUids: [],
              likesCityIds: [],
              dislikesCityIds: [],
              trips: [],
              notifications: [],
            };
            addNewUser(newUserProfile);
            setUserProfile(newUserProfile);
          } else {
            setUserProfile(response);
          }
        });
      }
    });
  }, []);

  useEffect(() => {
    if (userProfile) {
      const interval = setInterval(() => {
        getUserByUid(userProfile.uid).then((response) => {
          const array1: string = response.notifications.toString();
          const array2: string = userProfile.notifications.toString();

          if (array1 !== array2) {
            setUserProfile(response);
          }
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [userProfile]);

  return (
    <AuthContext.Provider
      value={{
        userProfile,
        setUserProfile,
        refreshProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export default AuthContextProvider;
