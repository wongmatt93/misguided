import Trip from "../models/Trip";
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
    return new Date(a.date1).valueOf() - new Date(b.date1).valueOf();
  });

export const sortTripsDescending = (tripArray: Trip[]): Trip[] =>
  tripArray.sort(function (a, b) {
    if (b.date2 + b._id! < a.date2 + a._id!) {
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
