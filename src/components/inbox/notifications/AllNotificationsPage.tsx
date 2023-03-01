import { useContext, useEffect, useState } from "react";
import { ListGroup } from "react-bootstrap";
import AuthContext from "../../../context/AuthContext";
import { Notification } from "../../../models/UserProfile";
import { readNotification } from "../../../services/userService";
import { sortNotifications } from "../../../utils/dateFunctions";
import "./AllNotificationsPage.css";
import NotificationCard from "./NotificationCard";

const AllNotificationsPage = () => {
  const { userProfile, refreshProfile } = useContext(AuthContext);
  const [filteredNotifs, setFilteredNotifs] = useState<Notification[]>([]);

  useEffect(() => {
    userProfile &&
      setFilteredNotifs(
        userProfile.notifications.filter(
          (notif) => notif.type !== "tripMessage"
        )
      );
  }, [userProfile]);

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
      <header className="AllNotificationsHeader">
        <h1>inbox / notifications</h1>
        <div className="mark-all" onClick={markAllRead}>
          <p>Mark all</p>
          <p>as read</p>
        </div>
      </header>
      <main className="AllNotificationsMain">
        {userProfile && (
          <ListGroup variant="flush">
            {sortNotifications(filteredNotifs).map((notification) => (
              <NotificationCard
                key={notification.date}
                uid={userProfile.uid}
                notification={notification}
              />
            ))}
          </ListGroup>
        )}
        {/* {userProfile && userProfile.notifications.length !== 0 && (
          <div className="loading">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        )} */}
      </main>
    </>
  );
};

export default AllNotificationsPage;
