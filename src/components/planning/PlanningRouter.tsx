import { Route, Routes } from "react-router-dom";
import UserProfile from "../../models/UserProfile";
import CityDetailsPage from "../CityDetails/CityDetailsPage";
import PlanningPage from "./PlanningPage";
import PlanTripPage from "./PlanTripPage";

interface Props {
  userProfile: UserProfile;
  refreshProfile: () => Promise<void>;
}

const PlanningRouter = ({ userProfile, refreshProfile }: Props) => {
  return (
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
        element={
          <PlanningPage uid={userProfile.uid} refreshProfile={refreshProfile} />
        }
      />
    </Routes>
  );
};

export default PlanningRouter;
