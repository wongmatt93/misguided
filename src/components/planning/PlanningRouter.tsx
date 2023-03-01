import { Route, Routes } from "react-router-dom";
import CityDetailsPage from "../cityDetails/CityDetailsPage";
import PlanningPage from "./PlanningPage";
import PlanTripPage from "./PlanTripPage";

const PlanningRouter = () => {
  return (
    <>
      <Routes>
        <Route index element={<PlanTripPage />} />
        <Route path="/city-details/:cityId" element={<CityDetailsPage />} />
        <Route path="/get-itinerary/:cityId" element={<PlanningPage />} />
      </Routes>
    </>
  );
};

export default PlanningRouter;
