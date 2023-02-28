import { useEffect, useState } from "react";
import UserProfile from "../models/UserProfile";

const useMutualFriends = (user: UserProfile, other: UserProfile): string[] => {
  const [mutualFriends, setMutualFriends] = useState<string[]>([]);

  useEffect(() => {
    let userHigher: string[];
    let userLower: string[];

    if (user.followingUids.length >= user.followersUids.length) {
      userHigher = user.followingUids;
      userLower = user.followersUids;
    } else {
      userHigher = user.followersUids;
      userLower = user.followingUids;
    }

    const userFriends: string[] = userLower.filter((lowerItem) =>
      userHigher.some((higherItem) => higherItem === lowerItem)
    );

    let otherHigher: string[];
    let otherLower: string[];

    if (other.followingUids.length >= other.followersUids.length) {
      otherHigher = other.followingUids;
      otherLower = other.followersUids;
    } else {
      otherHigher = other.followersUids;
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
  }, [user, other]);

  return mutualFriends;
};

export default useMutualFriends;
