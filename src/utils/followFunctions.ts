import { addFollowing, addNotification } from "../services/userProfileServices";

export const followUser = async (userUid: string, otherUid: string) => {
  await Promise.allSettled([
    addFollowing(userUid, otherUid),
    addNotification(otherUid, userUid, "follow", Date.now().toString()),
  ]);
};
