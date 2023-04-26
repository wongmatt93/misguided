import { useEffect, useState } from "react";
import UserProfile from "../models/UserProfile";
import { getUserByUid } from "../services/userService";

const useFollowStatus = (
  userProfile: UserProfile,
  otherUid: string
): string => {
  const [followStatus, setFollowStatus] = useState("none");

  useEffect(() => {
    getUserByUid(otherUid).then((otherProfile) => {
      const isFollowing: boolean = userProfile.followingUids.some(
        (followingUid) => followingUid === otherUid
      );
      const isFollower: boolean = otherProfile.followingUids.some(
        (followingUid) => followingUid === userProfile.uid
      );

      isFollowing && isFollower
        ? setFollowStatus("friend")
        : isFollowing
        ? setFollowStatus("following")
        : isFollower
        ? setFollowStatus("follower")
        : setFollowStatus("none");
    });
  }, [userProfile, otherUid]);

  return followStatus;
};

export default useFollowStatus;
