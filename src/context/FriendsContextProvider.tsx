import { ReactNode, useContext, useEffect, useState } from "react";
import UserProfile, { Friend } from "../models/UserProfile";
import {
  acceptFriend,
  deleteFriend,
  getAllUsersByUidArray,
} from "../services/userService";
import AuthContext from "./AuthContext";
import FriendsContext from "./FriendsContext";

interface Props {
  children: ReactNode;
}

const FriendsContextProvider = ({ children }: Props) => {
  const { userProfile, refreshProfile } = useContext(AuthContext);

  const [friends, setFriends] = useState<UserProfile[]>([]);
  const [friendRequests, setFriendRequests] = useState<UserProfile[]>([]);
  const [activeKey, setActiveKey] = useState("feed");

  useEffect(() => {
    if (userProfile) {
      const friendUids: string[] = [];
      const requestUids: string[] = [];

      userProfile.friends.forEach((friend) => {
        if (friend.friendRequestStatus === "accepted") {
          friendUids.push(friend.uid);
        } else if (friend.friendRequestStatus === "received") {
          requestUids.push(friend.uid);
        }
      });

      if (friendUids.length > 0) {
        getAllUsersByUidArray(friendUids).then((response) =>
          setFriends(response)
        );
      } else {
        setFriends([]);
      }

      if (requestUids.length > 0) {
        getAllUsersByUidArray(requestUids).then((response) =>
          setFriendRequests(response)
        );
      } else {
        setFriendRequests([]);
      }
    }
  }, [userProfile]);

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
        friends,
        friendRequests,
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
