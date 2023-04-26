import UserProfile, { Notification } from "../models/UserProfile";
import { addFollowing, addNotification } from "../services/userService";
import { createFollowNotif } from "./notificationsFunctions";

const followUser = async (user: UserProfile, other: UserProfile) => {
  const { uid: userUid } = user;
  const { uid: otherUid } = other;

  const newNotification: Notification = createFollowNotif(userUid);

  await Promise.allSettled([
    addFollowing(userUid, otherUid),
    addNotification(otherUid, newNotification),
  ]);
};

export { followUser };
