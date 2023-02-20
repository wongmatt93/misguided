import UserProfile from "../../../models/UserProfile";
import NotificationCard from "./NotificationCard";
import "./NotificationsSection.css";

interface Props {
  userProfile: UserProfile;
}

const NotificationsSection = ({ userProfile }: Props) => {
  return (
    <section className="NotificationsSection">
      <h3>Notifications</h3>
      <ul>
        {userProfile.notifications.map((notification) => (
          <NotificationCard
            key={notification.date}
            notification={notification}
          />
        ))}
      </ul>
    </section>
  );
};

export default NotificationsSection;
