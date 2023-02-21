import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import InboxHeader from "./InboxHeader";
import "./InboxPage.css";
import InboxNotificationsSection from "./notifications/InboxNotificationsSection";
import MessagesSection from "./messages/MessagesSection";

const InboxPage = () => {
  const { userProfile } = useContext(AuthContext);

  return (
    <>
      <InboxHeader />
      {userProfile && (
        <main>
          <InboxNotificationsSection userProfile={userProfile} />
          <MessagesSection />
        </main>
      )}
    </>
  );
};

export default InboxPage;
