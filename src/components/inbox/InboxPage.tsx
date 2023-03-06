import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import InboxHeader from "./InboxHeader";
import "./InboxPage.css";
import InboxNotificationsSection from "./notifications/InboxNotificationsSection";
import TripMessagesSection from "./messages/TripMessagesSection";

const InboxPage = () => {
  const { userProfile, refreshProfile } = useContext(AuthContext);

  return (
    <>
      <InboxHeader />
      {userProfile && (
        <main className="Inbox-main">
          <InboxNotificationsSection
            userProfile={userProfile}
            refreshProfile={refreshProfile}
          />
          <TripMessagesSection
            userProfile={userProfile}
            refreshProfile={refreshProfile}
          />
        </main>
      )}
    </>
  );
};

export default InboxPage;
