import UserProfile, { Notification } from "../../../models/UserProfile";
import InboxNotificationCard from "./InboxNotificationCard";
import "./InboxNotificationsCluster.css";

interface Props {
  notifications: Notification[];
  userProfile: UserProfile;
  refreshProfile: () => Promise<void>;
}

const InboxNotificationsCluster = ({
  notifications,
  userProfile,
  refreshProfile,
}: Props) => {
  return (
    <>
      {notifications.map((notification) => (
        <InboxNotificationCard
          key={notification.date + notification.uid}
          userProfile={userProfile}
          notification={notification}
          refreshProfile={refreshProfile}
        />
      ))}
    </>
  );
};

export default InboxNotificationsCluster;
