import { NewNotification } from "../models/UserProfile";

export const createFollowNotif = (uid: string): NewNotification => {
  return {
    uid,
    type: "follow",
    date: Date.now().toString(),
    read: false,
  };
};

export const createTripAcceptNotif = (
  uid: string,
  tripId: string
): NewNotification => {
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
): NewNotification => {
  return {
    uid,
    type: "tripDecline",
    date: Date.now().toString(),
    read: false,
    tripId,
  };
};

export const createTripRequestNotif = (
  uid: string,
  tripId: string
): NewNotification => {
  return {
    uid,
    type: "tripRequest",
    date: Date.now().toString(),
    read: false,
    tripId,
  };
};

export const createTripMessageNotif = (
  uid: string,
  tripId: string
): NewNotification => {
  return {
    uid,
    type: "tripMessage",
    date: Date.now().toString(),
    read: false,
    tripId,
  };
};
