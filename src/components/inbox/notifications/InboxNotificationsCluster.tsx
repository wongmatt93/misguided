import { Notification } from "../../../models/UserProfile";
import InboxNotificationCard from "./InboxNotificationCard";
import "./InboxNotificationsCluster.css";

interface Props {
  notifications: Notification[];
  uid: string;
  refreshProfile: () => Promise<void>;
}

const InboxNotificationsCluster = ({
  notifications,
  uid,
  refreshProfile,
}: Props) => {
  return (
    <>
      {notifications.map((notification) => (
        <InboxNotificationCard
          key={notification.date + notification.uid}
          uid={uid}
          notification={notification}
          refreshProfile={refreshProfile}
        />
      ))}
    </>
  );
};

export default InboxNotificationsCluster;
