import { useEffect, useState } from "react";
import UserProfile, { Notification } from "../../../models/UserProfile";
import { sortNotifications } from "../../../utils/dateFunctions";
import NotificationCard from "./NotificationCard";
import "./InboxNotificationsSection.css";
import { useNavigate } from "react-router-dom";
import ListGroup from "react-bootstrap/ListGroup";
import { RiArrowRightSLine } from "react-icons/ri";

interface Props {
  userProfile: UserProfile;
  refreshProfile: () => Promise<void>;
}

const InboxNotificationsSection = ({ userProfile, refreshProfile }: Props) => {
  const navigate = useNavigate();
  const [unread, setUnread] = useState(0);
  const [notifsPreview, setNotifsPreview] = useState<Notification[]>([]);

  useEffect(() => {
    setUnread(
      userProfile.notifications.filter(
        (notif) => notif.type !== "tripMessage" && !notif.read
      ).length
    );
    setNotifsPreview(
      sortNotifications(
        userProfile.notifications.filter(
          (notif) => notif.type !== "tripMessage"
        )
      ).slice(0, 3)
    );
  }, [userProfile]);

  return (
    <section className="InboxNotificationsSection">
      <div
        className="section-header-row"
        onClick={() => navigate(`/inbox/notifications`)}
      >
        <h2>
          Notifications{" "}
          <span style={{ display: unread ? "inline" : "none" }}>
            - {unread} unread
          </span>
        </h2>
        <RiArrowRightSLine />
      </div>
      {notifsPreview.length > 0 ? (
        <ListGroup variant="flush">
          {notifsPreview.map((notification) => (
            <NotificationCard
              key={notification.date}
              uid={userProfile.uid}
              notification={notification}
              refreshProfile={refreshProfile}
            />
          ))}
        </ListGroup>
      ) : (
        <p className="no-notifs">No Notifications Yet</p>
      )}
    </section>
  );
};

export default InboxNotificationsSection;
