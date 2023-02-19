import { ReactNode, useContext, useEffect, useState } from "react";
import UserProfile, { Follow } from "../models/UserProfile";
import {
  addFollower,
  addFollowing,
  getAllUsersByUidArray,
  removeFollower,
  removeFollowing,
} from "../services/userService";
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
  const [activeKey, setActiveKey] = useState("feed");

  useEffect(() => {
    if (userProfile) {
      const followingUids: string[] = [];

      userProfile.following.forEach((user) => followingUids.push(user.uid));

      if (followingUids.length > 0) {
        getAllUsersByUidArray(followingUids).then((response) =>
          setFollowing(response)
        );
      } else {
        setFollowing([]);
      }
    }
  }, [userProfile]);

  useEffect(() => {
    if (userProfile) {
      const followerUids: string[] = [];

      userProfile.followers.forEach((user) => followerUids.push(user.uid));

      if (followerUids.length > 0) {
        getAllUsersByUidArray(followerUids).then((response) =>
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

  const setFeedKey = (): void => setActiveKey("feed");
  const setFriendsKey = (): void => setActiveKey("friends");
  const setSearchKey = (): void => setActiveKey("search");

  const handleFollowUser = async (
    userUid: string,
    otherUid: string
  ): Promise<Follow | void> => {
    const following: Follow = { uid: otherUid };
    const follower: Follow = { uid: userUid };

    await addFollowing(userUid, following).then(() =>
      addFollower(otherUid, follower).then(() => refreshProfile(userUid))
    );
  };

  const handleUnfollowUser = async (
    userUid: string,
    otherUid: string
  ): Promise<void> =>
    await removeFollowing(userUid, otherUid).then(() =>
      removeFollower(otherUid, userUid).then(() => refreshProfile(userUid))
    );

  return (
    <FriendsContext.Provider
      value={{
        following,
        followers,
        friends,
        activeKey,
        setFeedKey,
        setFriendsKey,
        setSearchKey,
        handleFollowUser,
        handleUnfollowUser,
      }}
    >
      {children}
    </FriendsContext.Provider>
  );
};
export default FriendsContextProvider;
