import { useEffect, useState } from "react";
import UserProfile from "../models/UserProfile";

const useFollowStatus = (
  userProfile: UserProfile,
  otherUid: string
): string => {
  const [followStatus, setFollowStatus] = useState("none");

  useEffect(() => {
    const isFollowing: boolean = userProfile.followingUids.some(
      (followingUid) => followingUid === otherUid
    );
    const isFollower: boolean = userProfile.followersUids.some(
      (followerUid) => followerUid === otherUid
    );

    isFollowing && isFollower
      ? setFollowStatus("friend")
      : isFollowing
      ? setFollowStatus("following")
      : isFollower
      ? setFollowStatus("follower")
      : setFollowStatus("none");
  }, [userProfile, otherUid]);

  return followStatus;
};

export default useFollowStatus;
