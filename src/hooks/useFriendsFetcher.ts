import { useEffect, useState } from "react";
import UserProfile from "../models/UserProfile";
import { getAllUsersByUidArray } from "../services/userService";

const useFriendsFetcher = (userProfile: UserProfile): UserProfile[] => {
  const [friends, setFriends] = useState<UserProfile[]>([]);

  useEffect(() => {
    let higherQuantity: string[];
    let lowerQuantity: string[];

    if (userProfile.followingUids.length > userProfile.followersUids.length) {
      higherQuantity = userProfile.followingUids;
      lowerQuantity = userProfile.followersUids;
    } else {
      higherQuantity = userProfile.followersUids;
      lowerQuantity = userProfile.followingUids;
    }

    const friendsUids: string[] = lowerQuantity.filter((lowerItem) =>
      higherQuantity.includes(lowerItem)
    );

    friendsUids.length > 0 &&
      getAllUsersByUidArray(friendsUids).then((response) =>
        setFriends(response)
      );
  }, [userProfile]);

  return friends;
};

export default useFriendsFetcher;
