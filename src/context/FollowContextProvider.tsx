import { ReactNode, useContext, useEffect, useState } from "react";
import UserProfile, { Notification } from "../models/UserProfile";
import {
  addFollower,
  addFollowing,
  addNotification,
  getAllUsersByUidArray,
  removeFollower,
  removeFollowing,
} from "../services/userService";
import { createFollowNotif } from "../utils/notificationsFunctions";
import AuthContext from "./AuthContext";
import FriendsContext from "./FollowContext";

interface Props {
  children: ReactNode;
}

const FriendsContextProvider = ({ children }: Props) => {
  const { userProfile, refreshProfile } = useContext(AuthContext);

  const [following, setFollowing] = useState<UserProfile[]>([]);
  const [followers, setFollowers] = useState<UserProfile[]>([]);
  const [friends, setFriends] = useState<UserProfile[]>([]);

  useEffect(() => {
    if (userProfile) {
      if (userProfile.followingUids.length > 0) {
        getAllUsersByUidArray(userProfile.followingUids).then((response) =>
          setFollowing(response)
        );
      } else {
        setFollowing([]);
      }
    }
  }, [userProfile]);

  useEffect(() => {
    if (userProfile) {
      if (userProfile.followersUids.length > 0) {
        getAllUsersByUidArray(userProfile.followersUids).then((response) =>
          setFollowers(response)
        );
      } else {
        setFollowers([]);
      }
    }
  }, [userProfile]);

  useEffect(() => {
    if (userProfile) {
      let higherQuantity: UserProfile[];
      let lowerQuantity: UserProfile[];

      if (following.length >= followers.length) {
        higherQuantity = following;
        lowerQuantity = followers;
      } else {
        higherQuantity = followers;
        lowerQuantity = following;
      }

      const match: UserProfile[] = lowerQuantity.filter((lowerItem) =>
        higherQuantity.some((higherItem) => higherItem.uid === lowerItem.uid)
      );

      setFriends(match);
    }
  }, [userProfile, followers, following]);

  const handleFollowUser = async (
    userUid: string,
    otherUid: string
  ): Promise<string | void> => {
    const newNotification: Notification = createFollowNotif(userUid);

    await Promise.allSettled([
      addFollowing(userUid, otherUid),
      addFollower(otherUid, userUid),
      addNotification(otherUid, newNotification),
    ]);
    refreshProfile(userUid);
  };

  const handleUnfollowUser = async (
    userUid: string,
    otherUid: string
  ): Promise<void> => {
    await removeFollowing(userUid, otherUid);
    await removeFollower(otherUid, userUid);
    await refreshProfile(userUid);
  };

  return (
    <FriendsContext.Provider
      value={{
        following,
        followers,
        friends,
        handleFollowUser,
        handleUnfollowUser,
      }}
    >
      {children}
    </FriendsContext.Provider>
  );
};
export default FriendsContextProvider;
