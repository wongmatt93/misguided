import { Routes, Route } from "react-router-dom";
import TripCommentsSectionPage from "../tripCommentsSection/TripCommentsSectionPage";
import TripDetailsPage from "./TripDetailsPage";

const TripRouter = () => {
  return (
    <Routes>
      <Route index element={<TripDetailsPage />} />
      <Route path="/comments" element={<TripCommentsSectionPage />} />
    </Routes>
  );
};

export default TripRouter;
