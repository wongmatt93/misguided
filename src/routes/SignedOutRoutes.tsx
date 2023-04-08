import { Navigate, Route, Routes } from "react-router-dom";
import TripDetailsPage from "../components/common/TripDetails/TripDetailsPage";
import ProfilePage from "../components/Explorers/Profile/ProfilePage";
import GoodbyePage from "../components/Goodbye/GoodbyePage";
import LandingHeader from "../components/LandingPage/LandingHeader";
import LandingPage from "../components/LandingPage/LandingPage";

const SignedOutRoutes = () => {
  return (
    <>
      <LandingHeader />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/profile/:uid" element={<ProfilePage />} />
        <Route path="/search/profile/:uid" element={<ProfilePage />} />
        <Route path="/explorers/profile/:uid" element={<ProfilePage />} />
        <Route path="/trip-details/:tripId/" element={<TripDetailsPage />} />
        <Route
          path="/feed/trip-details/:tripId/"
          element={<TripDetailsPage />}
        />
        <Route
          path="/explorers/trip-details/:tripId/"
          element={<TripDetailsPage />}
        />
        <Route path="/good-bye" element={<GoodbyePage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
};

export default SignedOutRoutes;
