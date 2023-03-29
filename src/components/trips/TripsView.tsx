import { useEffect, useState } from "react";
import Trip from "../../models/Trip";
import UpcomingTripsContainer from "./UpcomingTrips/UpcomingTripsContainer";
import PastTripsContainer from "./PastTrips/PastTripsContainer";
import { UserTrip } from "../../models/UserProfile";
import {
  sortTripsAscending,
  sortTripsDescending,
  today,
} from "../../utils/dateFunctions";
import { Navigate, Route, Routes } from "react-router-dom";
import TripsNav from "./TripsNav";
import { getTripsByTripIdArray } from "../../services/tripServices";
import TripDetailsPage from "../common/TripDetails/TripDetailsPage";
import RatingPage from "../Rating/RatingPage";

interface Props {
  userTrips: UserTrip[];
}

const TripsView = ({ userTrips }: Props) => {
  const [upcomingTrips, setUpcomingTrips] = useState<Trip[]>([]);
  const [pastTrips, setPastTrips] = useState<Trip[]>([]);

  useEffect(() => {
    if (userTrips.length > 0) {
      const tripIds: string[] = [];

      userTrips.forEach((trip) => tripIds.push(trip.tripId));

      getTripsByTripIdArray(tripIds).then((response) => {
        const upcoming: Trip[] = [];
        const past: Trip[] = [];

        response.forEach((trip) => {
          let accepted: boolean = true;
          const userTrip: UserTrip | undefined = userTrips.find(
            (item) => item.tripId === trip._id!
          );

          const endDate: Date = trip.endDate
            ? new Date(Number(trip.endDate))
            : new Date(Number(trip.startDate));

          if (userTrip) {
            accepted = userTrip.accepted;
          }

          if (accepted) {
            if (today.getTime() - endDate.getTime() < 0) {
              upcoming.push(trip);
            } else {
              past.push(trip);
            }
          }
        });

        setUpcomingTrips(sortTripsAscending(upcoming));
        setPastTrips(sortTripsDescending(past));
      });
    }
  }, [userTrips]);

  return (
    <section className="main-view">
      <TripsNav />
      <Routes>
        <Route
          index
          element={<Navigate to="/trips/upcoming-trips" replace />}
        />
        <Route
          path="/upcoming-trips"
          element={<UpcomingTripsContainer upcomingTrips={upcomingTrips} />}
        />
        <Route
          path="/past-trips"
          element={<PastTripsContainer pastTrips={pastTrips} />}
        />
        <Route path="/trip-details/:tripId/*" element={<TripDetailsPage />} />
        <Route path="/rating/:cityId/*" element={<RatingPage />} />
      </Routes>
    </section>
  );
};

export default TripsView;
