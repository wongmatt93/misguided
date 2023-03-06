import { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/AuthContext";
import Trip from "../../models/Trip";
import "./TripsPage.css";
import UpcomingTripsContainer from "./UpcomingTripsContainer";
import PastTripsContainer from "./PastTripsContainer";
import { UserTrip } from "../../models/UserProfile";
import {
  sortTripsAscending,
  sortTripsDescending,
  today,
} from "../../utils/dateFunctions";
import { Navigate, Route, Routes } from "react-router-dom";
import TripsNav from "./TripsNav";
import { getTripsByTripIdArray } from "../../services/tripServices";

const TripsPage = () => {
  const { userProfile } = useContext(AuthContext);
  const [upcomingTrips, setUpcomingTrips] = useState<Trip[]>([]);
  const [pastTrips, setPastTrips] = useState<Trip[]>([]);

  useEffect(() => {
    if (userProfile) {
      if (userProfile.trips.length > 0) {
        const tripIds: string[] = [];

        userProfile.trips.forEach((trip) => tripIds.push(trip.tripId));

        getTripsByTripIdArray(tripIds).then((response) => {
          const upcoming: Trip[] = [];
          const past: Trip[] = [];

          response.forEach((trip) => {
            let accepted: boolean = true;
            const userTrip: UserTrip | undefined = userProfile!.trips.find(
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
    }
  }, [userProfile]);

  return (
    <>
      <header className="TripsHeader">
        <h1>trips</h1>
      </header>
      <main className="TripsPageMain">
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
        </Routes>
      </main>
    </>
  );
};

export default TripsPage;
