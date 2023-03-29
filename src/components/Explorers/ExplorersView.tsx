import { Route, Routes } from "react-router-dom";
import UserProfile from "../../models/UserProfile";
import ProfilePage from "./Profile/ProfilePage";
import TripDetailsPage from "../common/TripDetails/TripDetailsPage";
import ExplorersPage from "./ExplorersPage";

interface Props {
  userProfile: UserProfile;
  refreshProfile: () => Promise<void>;
}

const ExplorersView = ({ userProfile, refreshProfile }: Props) => {
  return (
    <section className="main-view">
      <Routes>
        <Route
          index
          element={
            <ExplorersPage
              userProfile={userProfile}
              refreshProfile={refreshProfile}
            />
          }
        />
        <Route path="/profile/:uid" element={<ProfilePage />} />
        <Route path="/trip-details/:tripId" element={<TripDetailsPage />} />
      </Routes>
    </section>
  );
};

export default ExplorersView;
