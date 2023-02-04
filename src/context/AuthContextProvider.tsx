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
  const [activeKey, setActiveKey] = useState("feed");

  const refreshProfile = (uid: string): Promise<void> =>
    getUserByUid(uid).then((response) => setUserProfile(response));

  useEffect(() => {
    // useEffect to only register once at start
    return auth.onAuthStateChanged((newUser) => {
      //setUserProfile(users.find((user) => user.email === newUser!.email));
      if (newUser) {
        getUserByUid(newUser.uid).then((response) => {
          if (!response) {
            const newUserProfile: UserProfile = {
              uid: newUser.uid,
              displayName: newUser.displayName,
              email: newUser.email,
              phoneNumber: newUser.phoneNumber,
              photoURL: newUser.photoURL,
              preferences: null,
              friends: [],
              likes: [],
              dislikes: [],
              trips: [],
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

  const setFriendsKey = (): void => setActiveKey("friends");
  const setSearchKey = (): void => setActiveKey("search");

  return (
    <AuthContext.Provider
      value={{
        userProfile,
        setUserProfile,
        refreshProfile,
        activeKey,
        setFriendsKey,
        setSearchKey,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export default AuthContextProvider;
