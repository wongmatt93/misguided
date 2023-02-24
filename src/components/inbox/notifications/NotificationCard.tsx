import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../../context/AuthContext";
import useProfileFetcher from "../../../hooks/useProfileFetcher";
import UserProfile, { Notification } from "../../../models/UserProfile";
import { readNotification } from "../../../services/userService";
import ListGroup from "react-bootstrap/ListGroup";
import "./NotificationCard.css";
import { getHhMm } from "../../../utils/dateFunctions";

interface Props {
  uid: string;
  notification: Notification;
}

const NotificationCard = ({ uid, notification }: Props) => {
  const { refreshProfile } = useContext(AuthContext);
  const profile: UserProfile | null = useProfileFetcher(notification.uid);
  const navigate = useNavigate();

  const markRead = (): Promise<void> =>
    readNotification(uid, notification.uid, notification.date).then(() =>
      refreshProfile(uid)
    );

  const handleViewClick = async (notification: Notification): Promise<void> => {
    await markRead();
    notification.type === "follow" && navigate(`/profile/${notification.uid}`);
    (notification.type === "tripRequest" ||
      notification.type === "tripAccept") &&
      navigate(`/trip/${notification.tripId}`);
    notification.type === "tripDecline" &&
      navigate(`/trip/${notification.tripId}`);
  };

  const handleReadClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ): void => {
    e.stopPropagation();
    markRead();
  };

  return (
    <>
      {profile && (
        <ListGroup.Item
          className="NotificationCard"
          onClick={() => handleViewClick(notification)}
        >
          <div className="dot-container" onClick={(e) => handleReadClick(e)}>
            <div
              className="notification-dot"
              style={{
                backgroundColor: notification.read ? "transparent" : "#f0b202",
              }}
            ></div>
          </div>
          <div className="image-message-container">
            <img src={profile.photoURL!} alt={profile.photoURL!} />
            <div className="notification-message">
              <p className="username">{profile.username}</p>
              {notification.type === "follow" && <p>started following you</p>}
              {notification.type === "tripRequest" && (
                <p>invited you on a trip!</p>
              )}
              {notification.type === "tripAccept" && (
                <p>is joining your trip!</p>
              )}
              {notification.type === "tripDecline" && (
                <p>is not joining your trip</p>
              )}
            </div>
          </div>
          <p>{getHhMm(notification.date)}</p>
        </ListGroup.Item>
      )}
    </>
  );
};

export default NotificationCard;
