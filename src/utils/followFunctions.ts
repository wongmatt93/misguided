import { NewNotification } from "../models/UserProfile";
import { addFollowing, addNotification } from "../services/userProfileServices";
import { createFollowNotif } from "./notificationsFunctions";

export const followUser = async (userUid: string, otherUid: string) => {
  const newNotification: NewNotification = createFollowNotif(userUid);

  await Promise.allSettled([
    addFollowing(userUid, otherUid),
    addNotification(otherUid, newNotification),
  ]);
};
