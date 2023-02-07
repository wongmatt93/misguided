import { ReactNode, useContext, useState } from "react";
import { Friend } from "../models/UserProfile";
import { acceptFriend, deleteFriend } from "../services/userService";
import AuthContext from "./AuthContext";
import FriendsContext from "./FriendsContext";

interface Props {
  children: ReactNode;
}

const FriendsContextProvider = ({ children }: Props) => {
  const { refreshProfile } = useContext(AuthContext);

  const [activeKey, setActiveKey] = useState("feed");

  const setFriendsKey = (): void => setActiveKey("friends");
  const setSearchKey = (): void => setActiveKey("search");

  const handleAcceptFriend = (
    userUid: string,
    otherUid: string
  ): Promise<Friend | void> =>
    acceptFriend(userUid, otherUid).then(() =>
      acceptFriend(otherUid, userUid).then(() => refreshProfile(userUid))
    );

  const handleDeleteFriend = (
    userUid: string,
    otherUid: string
  ): Promise<void> =>
    deleteFriend(userUid, otherUid).then(() =>
      deleteFriend(otherUid, userUid).then(() => refreshProfile(userUid))
    );

  return (
    <FriendsContext.Provider
      value={{
        activeKey,
        setFriendsKey,
        setSearchKey,
        handleAcceptFriend,
        handleDeleteFriend,
      }}
    >
      {children}
    </FriendsContext.Provider>
  );
};
export default FriendsContextProvider;
