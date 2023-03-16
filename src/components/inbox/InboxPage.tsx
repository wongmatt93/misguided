import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import "./InboxPage.css";
import InboxNotificationsContainer from "./Notifications/InboxNotificationsContainer";
import InboxMessagesContainer from "./Messages/InboxMessagesContainer";
import { Navigate, Route, Routes } from "react-router-dom";
import TripMessageThreadPage from "../tripMessageThread/TripMessageThreadPage";
import InboxNav from "./InboxNav";

const InboxPage = () => {
  const { userProfile, refreshProfile } = useContext(AuthContext);

  return (
    <>
      {userProfile && (
        <section className="InboxPage">
          <InboxNav userProfile={userProfile} />
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
            <Route path="/thread/:tripId" element={<TripMessageThreadPage />} />
          </Routes>
        </section>
      )}
    </>
  );
};

export default InboxPage;
