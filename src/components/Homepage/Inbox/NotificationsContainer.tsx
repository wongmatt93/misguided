import { Notification } from "../../../models/UserProfile";
import NotificationCard from "./NotificationCard";
import "./NotificationsContainer.css";

interface Props {
  uid: string;
  notifications: Notification[];
  refreshProfile: () => Promise<void>;
}

const NotificationsContainer = ({
  uid,
  notifications,
  refreshProfile,
}: Props) => {
  return (
    <ul className="NotificationsContainer">
      {notifications.map((notification) => (
        <NotificationCard
          key={notification.date + notification.user.uid}
          uid={uid}
          notification={notification}
          refreshProfile={refreshProfile}
        />
      ))}
    </ul>
  );
};

export default NotificationsContainer;
