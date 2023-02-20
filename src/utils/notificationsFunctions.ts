import { Notification } from "../models/UserProfile";

export const createNotification = (uid: string, type: string): Notification => {
  return {
    uid,
    type,
    date: Date.now().toString(),
    read: false,
  };
};
