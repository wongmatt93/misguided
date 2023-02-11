import Trip from "../models/Trip";

export let today: Date = new Date();
const dd = String(today.getDate()).padStart(2, "0");
const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
const yyyy = today.getFullYear();
today = new Date(yyyy + "-" + mm + "-" + dd);

export const sortTripsAscending = (tripArray: Trip[]): Trip[] =>
  tripArray.sort(function (a, b) {
    return new Date(a.date1).valueOf() - new Date(b.date1).valueOf();
  });

export const sortTripsDescending = (tripArray: Trip[]): Trip[] =>
  tripArray.sort(function (a, b) {
    return new Date(b.date1).valueOf() - new Date(a.date1).valueOf();
  });
