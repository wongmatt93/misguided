import { UserSummary } from "../models/UserProfile";

export const getFriends = (
  followings: UserSummary[],
  followers: UserSummary[]
): UserSummary[] =>
  followings.filter((following) =>
    followers.some((follower) => follower.uid === following.uid)
  );
