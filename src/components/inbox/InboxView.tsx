import InboxNotificationsContainer from "./Notifications/InboxNotificationsContainer";
import InboxMessagesContainer from "./Messages/InboxMessagesContainer";
import { Navigate, Route, Routes } from "react-router-dom";
import TripMessageThreadPage from "../TripMessageThread/TripMessageThreadPage";
import InboxNav from "./InboxNav";
import FullUserProfile from "../../models/UserProfile";
import TripDetailsPage from "../TripDetails/TripDetailsPage";

interface Props {
  userProfile: FullUserProfile;
  refreshProfile: () => Promise<void>;
}

const InboxView = ({ userProfile, refreshProfile }: Props) => {
  return (
    <section className="main-view">
      <InboxNav notifications={userProfile.notifications} />
      <Routes>
        <Route index element={<Navigate to="/inbox/messages" replace />} />
        <Route
          path="/messages"
          element={
            <InboxMessagesContainer
              userProfile={userProfile}
              refreshProfile={refreshProfile}
            />
          }
        />
        <Route
          path="/notifications"
          element={
            <InboxNotificationsContainer
              userProfile={userProfile}
              refreshProfile={refreshProfile}
            />
          }
        />
        <Route
          path="/thread/:tripId"
          element={<TripMessageThreadPage userUid={userProfile.uid} />}
        />
        <Route path="/trip-details/:tripId" element={<TripDetailsPage />} />
      </Routes>
    </section>
  );
};

export default InboxView;
