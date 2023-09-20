import { Route, Routes } from "react-router-dom";
import { Trip } from "../../../models/Trip";
import { UserSummary } from "../../../models/UserProfile";
import TripDetails from "../TripDetails/TripDetails";

import "./Trips.css";
import TripsMain from "./TripsMain";

interface Props {
  uid: string;
  upcomingTrips: Trip[];
  pastTrips: Trip[];
  followers: UserSummary[];
  followings: UserSummary[];
  refreshProfile: () => Promise<void>;
}

const Trips = ({
  uid,
  upcomingTrips,
  pastTrips,
  followers,
  followings,
  refreshProfile,
}: Props) => {
  return (
    <section className="Trips">
      <Routes>
        <Route
          index
          element={
            <TripsMain
              upcomingTrips={upcomingTrips}
              pastTrips={pastTrips}
              refreshProfile={refreshProfile}
            />
          }
        />
        <Route
          path="trip-details/:tripId"
          element={
            <TripDetails
              uid={uid}
              upcomingTrips={upcomingTrips}
              followers={followers}
              followings={followings}
              refreshProfile={refreshProfile}
            />
          }
        />
      </Routes>
    </section>
  );
};

export default Trips;
