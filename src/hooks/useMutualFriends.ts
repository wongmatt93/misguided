import { useEffect, useState } from "react";
import UserProfile from "../models/UserProfile";
import { getUserFollowers } from "../services/userService";

const useMutualFriends = (
  user: UserProfile,
  followers: UserProfile[],
  other: UserProfile
): string[] => {
  const [mutualFriends, setMutualFriends] = useState<string[]>([]);

  const userFollowers: string[] = followers.map((follower) => follower.uid);

  useEffect(() => {
    getUserFollowers(other.uid).then((followers) => {
      const otherFollowers: string[] = followers.map(
        (follower) => follower.uid
      );

      let userHigher: string[];
      let userLower: string[];

      if (user.followingUids.length >= userFollowers.length) {
        userHigher = user.followingUids;
        userLower = userFollowers;
      } else {
        userHigher = userFollowers;
        userLower = user.followingUids;
      }

      const userFriends: string[] = userLower.filter((lowerItem) =>
        userHigher.some((higherItem) => higherItem === lowerItem)
      );

      let otherHigher: string[];
      let otherLower: string[];

      if (other.followingUids.length >= otherFollowers.length) {
        otherHigher = other.followingUids;
        otherLower = otherFollowers;
      } else {
        otherHigher = otherFollowers;
        otherLower = other.followingUids;
      }

      const otherFriends: string[] = otherLower.filter((lowerItem) =>
        otherHigher.some((higherItem) => higherItem === lowerItem)
      );

      let higher: string[];
      let lower: string[];

      if (userFriends.length >= otherFriends.length) {
        higher = userFriends;
        lower = otherFriends;
      } else {
        higher = otherFriends;
        lower = userFriends;
      }

      const mutuals: string[] = lower.filter((lowerItem) =>
        higher.some((higherItem) => higherItem === lowerItem)
      );

      setMutualFriends(mutuals);
    });
  }, [user, other]);

  return mutualFriends;
};

export default useMutualFriends;
