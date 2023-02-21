import { Notification } from "../models/UserProfile";

export const createFollowNotif = (uid: string): Notification => {
  return {
    uid,
    type: "follow",
    date: Date.now().toString(),
    read: false,
  };
};

export const createTripRequestNotif = (
  uid: string,
  tripId: string
): Notification => {
  return {
    uid,
    type: "tripRequest",
    date: Date.now().toString(),
    read: false,
    tripId,
  };
};

export const createTripAcceptNotif = (
  uid: string,
  tripId: string
): Notification => {
  return {
    uid,
    type: "tripAccept",
    date: Date.now().toString(),
    read: false,
    tripId,
  };
};

export const createTripDeclineNotif = (
  uid: string,
  tripId: string
): Notification => {
  return {
    uid,
    type: "tripDecline",
    date: Date.now().toString(),
    read: false,
    tripId,
  };
};
