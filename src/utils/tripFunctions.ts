import { Trip } from "../models/Trip";

export const doubleBook = async (
  upcomingTrips: Trip[],
  startDate: string,
  endDate: string
): Promise<boolean> => {
  let doubleBooked: boolean = false;

  if (upcomingTrips.length > 0) {
    upcomingTrips.forEach((trip) => {
      const startDateConflict: boolean =
        Number(trip.startDate) <= Number(startDate) &&
        Number(startDate) <= Number(trip.endDate);
      const endDateConflict: boolean =
        Number(trip.startDate) <= Number(endDate) &&
        Number(endDate) <= Number(trip.endDate);

      if (startDateConflict || endDateConflict) {
        doubleBooked = true;
        return false;
      }
    });
  }
  return doubleBooked;
};
