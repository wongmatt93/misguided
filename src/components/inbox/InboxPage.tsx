import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import "./InboxPage.css";
import InboxNotificationsContainer from "./notifications/InboxNotificationsContainer";
import InboxMessagesContainer from "./messages/InboxMessagesContainer";
import InboxNav from "./InboxNav";
import { Navigate, Route, Routes } from "react-router-dom";

const InboxPage = () => {
  const { userProfile, refreshProfile } = useContext(AuthContext);

  return (
    <>
      {userProfile && (
        <main className="InboxMain">
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
          </Routes>
        </main>
      )}
    </>
  );
};

export default InboxPage;
