import { Route, Routes } from "react-router-dom";
import UserProfile from "../../models/UserProfile";
import TripDetailsPage from "../TripDetails/TripDetailsPage";
import FeedPage from "./FeedPage";

interface Props {
  userProfile: UserProfile;
}

const FeedView = ({ userProfile }: Props) => {
  return (
    <section className="main-view">
      <Routes>
        <Route index element={<FeedPage userProfile={userProfile} />} />
        <Route path="/trip-details/:tripId/*" element={<TripDetailsPage />} />
      </Routes>
    </section>
  );
};

export default FeedView;
