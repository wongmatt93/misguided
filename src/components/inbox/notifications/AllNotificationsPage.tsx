import { useContext, useState } from "react";
import { Spinner } from "react-bootstrap";
import AuthContext from "../../../context/AuthContext";
import { Notification } from "../../../models/UserProfile";
import { readNotification } from "../../../services/userService";
import { sortNotifications } from "../../../utils/dateFunctions";
import "./AllNotificationsPage.css";
import NotificationCard from "./NotificationCard";

const AllNotificationsPage = () => {
  const { userProfile, refreshProfile } = useContext(AuthContext);
  const [loaded, setLoaded] = useState(0);

  const markAllRead = async (): Promise<void> => {
    const unread: Notification[] = userProfile!.notifications.filter(
      (notif) => !notif.read
    );

    await Promise.allSettled(
      unread.map((notif) =>
        readNotification(userProfile!.uid, notif.uid, notif.date)
      )
    );

    await refreshProfile(userProfile!.uid);
  };

  return (
    <>
      <header className="AllNotificationsPage-header">
        <h1>All notifications</h1>
        <button onClick={markAllRead}>Mark all as read</button>
      </header>
      <main className="AllNotificationsPage-main">
        {userProfile && (
          <ul
            style={{
              display:
                userProfile.notifications.length === loaded ? "block" : "none",
            }}
          >
            {sortNotifications(userProfile.notifications).map(
              (notification) => (
                <NotificationCard
                  key={notification.date}
                  uid={userProfile.uid}
                  notification={notification}
                  setLoaded={setLoaded}
                />
              )
            )}
          </ul>
        )}
        {userProfile && userProfile.notifications.length !== loaded && (
          <div className="loading">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        )}
      </main>
    </>
  );
};

export default AllNotificationsPage;
