import { Notification } from "../models/UserProfile";

export const getUnreadNotifsCount = (notifications: Notification[]): number =>
  notifications.filter((notif) => !notif.read).length;
