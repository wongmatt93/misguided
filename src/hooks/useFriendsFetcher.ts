import { useEffect, useState } from "react";
import UserProfile from "../models/UserProfile";
import { getAllUsersByUidArray } from "../services/userService";

const useFriendsFetcher = (
  userProfile: UserProfile,
  followers: UserProfile[]
): UserProfile[] => {
  const [friends, setFriends] = useState<UserProfile[]>([]);
  const userFollowers: string[] = followers.map((followers) => followers.uid);

  useEffect(() => {
    const { followingUids } = userProfile;

    let higherQuantity: string[];
    let lowerQuantity: string[];

    if (followingUids.length > userFollowers.length) {
      higherQuantity = followingUids;
      lowerQuantity = userFollowers;
    } else {
      higherQuantity = userFollowers;
      lowerQuantity = followingUids;
    }

    const friendsUids: string[] = lowerQuantity.filter((lowerItem) =>
      higherQuantity.includes(lowerItem)
    );

    friendsUids.length > 0 &&
      getAllUsersByUidArray(friendsUids).then((response) =>
        setFriends(response)
      );
  }, [userProfile, userFollowers]);

  return friends;
};

export default useFriendsFetcher;
