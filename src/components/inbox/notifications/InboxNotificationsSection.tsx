import { useEffect, useState } from "react";
import UserProfile, { Notification } from "../../../models/UserProfile";
import { sortNotifications } from "../../../utils/dateFunctions";
import NotificationCard from "./NotificationCard";
import "./InboxNotificationsSection.css";
import { useNavigate } from "react-router-dom";

interface Props {
  userProfile: UserProfile;
}

const InboxNotificationsSection = ({ userProfile }: Props) => {
  const navigate = useNavigate();
  const [unread, setUnread] = useState(0);
  const [notifsPreview, setNotifsPreview] = useState<Notification[]>([]);
  const [loaded, setLoaded] = useState(0);

  useEffect(() => {
    setUnread(userProfile.notifications.filter((notif) => !notif.read).length);
    setNotifsPreview(sortNotifications(userProfile.notifications).slice(0, 3));
  }, [userProfile]);

  return (
    <section className="InboxNotificationsSection">
      <h3>
        Notifications{" "}
        <span style={{ display: unread ? "inline" : "none" }}>
          - {unread} unread
        </span>
      </h3>
      <ul
        style={{
          display: notifsPreview.length === loaded ? "block" : "none",
        }}
      >
        {notifsPreview.map((notification) => (
          <NotificationCard
            key={notification.date}
            uid={userProfile.uid}
            notification={notification}
            setLoaded={setLoaded}
          />
        ))}
        <li onClick={() => navigate(`/notifications`)}>
          View all notifications
        </li>
      </ul>
    </section>
  );
};

export default InboxNotificationsSection;
