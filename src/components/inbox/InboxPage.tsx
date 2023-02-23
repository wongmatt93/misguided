import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import InboxHeader from "./InboxHeader";
import "./InboxPage.css";
import InboxNotificationsSection from "./notifications/InboxNotificationsSection";
import TripMessagesSection from "./messages/TripMessagesSection";

const InboxPage = () => {
  const { userProfile } = useContext(AuthContext);

  return (
    <>
      <InboxHeader />
      {userProfile && (
        <main className="Inbox-main">
          <InboxNotificationsSection userProfile={userProfile} />
          <TripMessagesSection userProfile={userProfile} />
        </main>
      )}
    </>
  );
};

export default InboxPage;
