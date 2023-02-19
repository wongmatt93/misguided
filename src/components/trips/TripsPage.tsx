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
import TripsHeader from "./TripsHeader";
import { Navigate, Route, Routes } from "react-router-dom";

const TripsPage = () => {
  const { userProfile, userTrips } = useContext(AuthContext);
  const [upcomingTrips, setUpcomingTrips] = useState<Trip[]>([]);
  const [pastTrips, setPastTrips] = useState<Trip[]>([]);

  useEffect(() => {
    if (userTrips.length > 0) {
      const upcoming: Trip[] = [];
      const past: Trip[] = [];

      userTrips.forEach((trip) => {
        let accepted: boolean = true;
        const userTrip: UserTrip | undefined = userProfile!.trips.find(
          (item) => item.tripId === trip._id!
        );

        const endDate = new Date(trip.date2);

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
    }
  }, [userProfile, userTrips]);

  return (
    <>
      <TripsHeader />
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
    </>
  );
};

export default TripsPage;
