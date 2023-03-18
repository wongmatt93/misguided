import "./InboxPage.css";
import InboxNotificationsContainer from "./Notifications/InboxNotificationsContainer";
import InboxMessagesContainer from "./Messages/InboxMessagesContainer";
import { Navigate, Route, Routes } from "react-router-dom";
import TripMessageThreadPage from "../TripMessageThread/TripMessageThreadPage";
import InboxNav from "./InboxNav";
import UserProfile from "../../models/UserProfile";

interface Props {
  userProfile: UserProfile;
  refreshProfile: () => Promise<void>;
}

const InboxPage = ({ userProfile, refreshProfile }: Props) => {
  return (
    <section className="InboxPage">
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
      </Routes>
    </section>
  );
};

export default InboxPage;
