import Trip from "../models/Trip";
import UserProfile from "../models/UserProfile";
import { getAcceptedTrips } from "./userFunctions";

const doubleBook = async (
  user: UserProfile,
  startDate: string,
  endDate: string
): Promise<boolean> => {
  let doubleBooked: boolean = false;

  if (user.tripIds.length > 0) {
    const acceptedTrips: Trip[] = await getAcceptedTrips(user);

    if (acceptedTrips.length > 0) {
      acceptedTrips.forEach((trip) => {
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
  }
  return doubleBooked;
};

export default doubleBook;
