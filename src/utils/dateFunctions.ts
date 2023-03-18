import Trip, { Comment } from "../models/Trip";
import { Notification } from "../models/UserProfile";

export let today: Date = new Date();

const dd = String(today.getDate()).padStart(2, "0");
const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
const yyyy = today.getFullYear();
today = new Date(yyyy + "-" + mm + "-" + dd);

export const sortNotifications = (
  notificationArray: Notification[]
): Notification[] =>
  notificationArray.sort(function (a, b) {
    return Number(b.date) - Number(a.date);
  });

export const sortTripsAscending = (tripArray: Trip[]): Trip[] =>
  tripArray.sort(function (a, b) {
    return Number(a.startDate) - Number(b.startDate);
  });

export const sortTripsDescending = (tripArray: Trip[]): Trip[] =>
  tripArray.sort(function (a, b) {
    if (b.endDate + b._id! < a.endDate + a._id!) {
      return -1;
    } else {
      return 1;
    }
  });

export const sortCommentsDescending = (comments: Comment[]): Comment[] =>
  comments.sort(function (a, b) {
    if (b.date + b.uid < a.date + a.uid) {
      return -1;
    } else {
      return 1;
    }
  });

export const getHhMm = (date: string): string => {
  const dateObject: Date = new Date(Number(date));
  let hh: number = dateObject.getHours();
  const amPm: string = hh >= 12 ? "PM" : "AM";
  hh = hh % 12;
  hh = hh ? hh : 12;
  let mm: number | string = dateObject.getMinutes();
  mm = mm < 10 ? "0" + mm : mm;

  return hh + ":" + mm + " " + amPm;
};

export const timeStamp = (date: string) => {
  let difference: number = Number(new Date()) - Number(date);

  if (difference < 86400000) {
    return getHhMm(date);
  } else if (difference < 604800000) {
    const days = Math.floor(difference / 86400000);
    return `${days} day${days > 1 ? "s" : ""} ago`;
  } else if (difference < 31560000000) {
    return new Date(Number(date)).toLocaleDateString();
  } else {
    const years = Math.floor(difference / 31560000000);
    return `${years} year${years > 1 ? "s" : ""}s ago`;
  }
};
