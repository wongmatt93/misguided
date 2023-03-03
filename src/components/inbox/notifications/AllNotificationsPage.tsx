import { useContext, useEffect, useState } from "react";
import { ListGroup, Dropdown } from "react-bootstrap";
import { RiMoreFill } from "react-icons/ri";
import AuthContext from "../../../context/AuthContext";
import { Notification } from "../../../models/UserProfile";
import {
  deleteAllNotifications,
  readNotification,
} from "../../../services/userService";
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

    refreshProfile(userProfile!.uid);
  };

  const deleteAll = async (uid: string): Promise<void> => {
    await deleteAllNotifications(uid);
    refreshProfile(uid);
  };

  return (
    <>
      {userProfile && (
        <>
          <header className="AllNotificationsHeader">
            <h1>inbox / notifications</h1>
            <Dropdown>
              <Dropdown.Toggle variant="warning">
                <RiMoreFill />
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={markAllRead}>
                  Mark All Read
                </Dropdown.Item>
                <Dropdown.Item onClick={() => deleteAll(userProfile.uid)}>
                  Delete All
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </header>
          <main className="AllNotificationsMain">
            <ListGroup variant="flush">
              {sortNotifications(filteredNotifs).map((notification) => (
                <NotificationCard
                  key={notification.date}
                  uid={userProfile.uid}
                  notification={notification}
                />
              ))}
            </ListGroup>

            {/* {userProfile && userProfile.notifications.length !== 0 && (
          <div className="loading">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        )} */}
          </main>
        </>
      )}
    </>
  );
};

export default AllNotificationsPage;
