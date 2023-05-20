import UpcomingTripsContainer from "./UpcomingTrips/UpcomingTripsContainer";
import PastTripsContainer from "./PastTrips/PastTripsContainer";
import { Navigate, Route, Routes } from "react-router-dom";
import TripsNav from "./TripsNav";
import TripDetailsPage from "../common/TripDetails/TripDetailsPage";
import RatingPage from "../Rating/RatingPage";
import ActiveUserProfile from "../../models/UserProfile";

interface Props {
  userProfile: ActiveUserProfile;
}

const TripsView = ({ userProfile }: Props) => {
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
          element={
            <UpcomingTripsContainer upcomingTrips={userProfile.upcomingTrips} />
          }
        />
        <Route
          path="/past-trips"
          element={<PastTripsContainer pastTrips={userProfile.pastTrips} />}
        />
        <Route path="/trip-details/:tripId/*" element={<TripDetailsPage />} />
        <Route path="/rating/:cityId/*" element={<RatingPage />} />
      </Routes>
    </section>
  );
};

export default TripsView;
