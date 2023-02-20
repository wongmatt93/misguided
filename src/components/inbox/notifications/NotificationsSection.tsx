import { useEffect, useState } from "react";
import UserProfile, { Notification } from "../../../models/UserProfile";
import { sortNotifications } from "../../../utils/dateFunctions";
import NotificationCard from "./NotificationCard";
import "./NotificationsSection.css";

interface Props {
  userProfile: UserProfile;
}

const NotificationsSection = ({ userProfile }: Props) => {
  const [unread, setUnread] = useState(0);
  const [notifsPreview, setNotifsPreview] = useState<Notification[]>([]);
  const [loaded, setLoaded] = useState(0);

  useEffect(() => {
    setUnread(userProfile.notifications.filter((notif) => !notif.read).length);
    setNotifsPreview(sortNotifications(userProfile.notifications).slice(0, 3));
  }, [userProfile]);

  return (
    <section className="NotificationsSection">
      <h3>
        Notifications <span>- {unread} unread</span>
      </h3>
      <ul
        style={{
          display: notifsPreview.length === loaded ? "block" : "none",
        }}
      >
        {notifsPreview.map((notification) => (
          <NotificationCard
            key={notification.date}
            notification={notification}
            setLoaded={setLoaded}
          />
        ))}
        <li>View all notifications</li>
      </ul>
    </section>
  );
};

export default NotificationsSection;
