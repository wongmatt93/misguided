import { Route, Routes } from "react-router-dom";
import UserProfile from "../../models/UserProfile";
import ProfilePage from "../Profile/ProfilePage";
import TripDetailsPage from "../TripDetails/TripDetailsPage";
import ExplorersPage from "./ExplorersPage";
import SearchPage from "./SearchPage";

interface Props {
  userProfile: UserProfile;
}

const ExplorersRouter = ({ userProfile }: Props) => {
  return (
    <Routes>
      <Route index element={<ExplorersPage userProfile={userProfile} />} />
      <Route
        path="/search"
        element={<SearchPage userProfile={userProfile} />}
      />
      <Route path="/profile/:uid" element={<ProfilePage />} />
      <Route path="/trip-details/:tripId" element={<TripDetailsPage />} />
    </Routes>
  );
};

export default ExplorersRouter;
