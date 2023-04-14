import UserProfile, { Notification } from "../models/UserProfile";
import {
  addFollower,
  addFollowing,
  addNotification,
  removeFollower,
  removeFollowing,
} from "../services/userService";
import { createFollowNotif } from "./notificationsFunctions";

const followUser = async (user: UserProfile, other: UserProfile) => {
  const { uid: userUid } = user;
  const { uid: otherUid } = other;

  const newNotification: Notification = createFollowNotif(userUid);

  await Promise.allSettled([
    addFollowing(userUid, otherUid),
    addFollower(otherUid, userUid),
    addNotification(otherUid, newNotification),
  ]);
};

const unfollowUser = async (user: UserProfile, other: UserProfile) => {
  const { uid: userUid } = user;
  const { uid: otherUid } = other;

  await Promise.allSettled([
    removeFollowing(userUid, otherUid),
    removeFollower(otherUid, userUid),
  ]);
};

export { followUser, unfollowUser };
