import UserProfile from "../models/UserProfile";
import { getTripsByTripIdArray } from "../services/tripServices";

const doubleBook = async (
  user: UserProfile,
  startDate: string,
  endDate: string
): Promise<boolean> => {
  let doubleBooked: boolean = false;

  const acceptedTripIds: string[] = user.trips
    .filter((userTrip) => userTrip.accepted)
    .map((trip) => trip.tripId);

  if (acceptedTripIds.length > 0) {
    const trips = await getTripsByTripIdArray(acceptedTripIds);
    trips.forEach((trip) => {
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

export default doubleBook;
