import { Route, Routes } from "react-router-dom";
import UserProfile from "../../models/UserProfile";
import CityDetailsPage from "../CityDetails/CityDetailsPage";
import DiscoverPage from "./Discover/DiscoverPage";
import PlanningPage from "./PlanningPage";
import PlanTripPage from "./PlanTripPage";

interface Props {
  userProfile: UserProfile;
  refreshProfile: () => Promise<void>;
}

const PlanningView = ({ userProfile, refreshProfile }: Props) => {
  return (
    <section className="main-view">
      <Routes>
        <Route index element={<PlanTripPage userProfile={userProfile} />} />
        <Route
          path="/city-details/:cityId"
          element={
            <CityDetailsPage
              userProfile={userProfile}
              refreshProfile={refreshProfile}
            />
          }
        />
        <Route
          path="/get-itinerary/:cityId"
          element={<PlanningPage userProfile={userProfile} />}
        />
        <Route
          path="/discover"
          element={
            <DiscoverPage
              userProfile={userProfile}
              refreshProfile={refreshProfile}
            />
          }
        />
      </Routes>
    </section>
  );
};

export default PlanningView;
