import { Route, Routes } from "react-router-dom";
import TripMessageThreadPage from "../tripMessageThread/TripMessageThreadPage";
import InboxPage from "./InboxPage";
import "./InboxRouter.css";
import AllNotificationsPage from "./notifications/AllNotificationsPage";

const InboxRouter = () => {
  return (
    <>
      <Routes>
        <Route index element={<InboxPage />} />
        <Route path="/notifications" element={<AllNotificationsPage />} />
        <Route path="/thread/:tripId" element={<TripMessageThreadPage />} />
      </Routes>
    </>
  );
};

export default InboxRouter;
