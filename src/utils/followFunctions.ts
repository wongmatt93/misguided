import ActiveUserProfile, {
  UserProfile,
  Notification,
} from "../models/UserProfile";
import { addFollowing, addNotification } from "../services/userService";
import { createFollowNotif } from "./notificationsFunctions";

const followUser = async (user: ActiveUserProfile, other: UserProfile) => {
  const { uid: userUid } = user;
  const { uid: otherUid } = other;

  const newNotification: Notification = createFollowNotif(userUid);

  await Promise.allSettled([
    addFollowing(userUid, otherUid),
    addNotification(otherUid, newNotification),
  ]);
};

const getFollowStatus = (
  userProfile: ActiveUserProfile,
  otherUid: string
): string => {
  const following: boolean = userProfile.followingUserProfiles.some(
    (profile) => profile.uid === otherUid
  );

  const follower: boolean = userProfile.followerUserProfiles.some(
    (profile) => profile.uid === otherUid
  );

  if (following && follower) {
    return "friends";
  } else if (following) {
    return "following";
  } else if (follower) {
    return "follower";
  } else {
    return "none";
  }
};

const getFriends = (userProfile: ActiveUserProfile): UserProfile[] => {
  const { followingUserProfiles, followerUserProfiles } = userProfile;

  if (followingUserProfiles.length > followerUserProfiles.length) {
    return followerUserProfiles.filter((follower) =>
      followingUserProfiles.some((following) => following.uid === follower.uid)
    );
  } else {
    return followingUserProfiles.filter((following) =>
      followerUserProfiles.some((follower) => follower.uid === following.uid)
    );
  }
};

export { followUser, getFollowStatus, getFriends };
