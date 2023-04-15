import { useEffect, useState } from "react";
import Trip, { Participant } from "../../models/Trip";
import UpcomingTripsContainer from "./UpcomingTrips/UpcomingTripsContainer";
import PastTripsContainer from "./PastTrips/PastTripsContainer";
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
import UserProfile from "../../models/UserProfile";

interface Props {
  userProfile: UserProfile;
}

const TripsView = ({ userProfile }: Props) => {
  const [upcomingTrips, setUpcomingTrips] = useState<Trip[]>([]);
  const [pastTrips, setPastTrips] = useState<Trip[]>([]);

  useEffect(() => {
    const { uid, tripIds } = userProfile;
    if (tripIds.length > 0) {
      getTripsByTripIdArray(tripIds).then((trips) => {
        const upcoming: Trip[] = [];
        const past: Trip[] = [];

        trips.forEach((trip) => {
          const participant: Participant | undefined = trip.participants.find(
            (participant) => participant.uid === uid
          );

          const endDate: Date = trip.endDate
            ? new Date(Number(trip.endDate))
            : new Date(Number(trip.startDate));

          if (participant?.accepted) {
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
  }, [userProfile]);

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
