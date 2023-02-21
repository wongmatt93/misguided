import { useContext, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../../context/AuthContext";
import useProfileFetcher from "../../../hooks/useProfileFetcher";
import UserProfile, { Notification } from "../../../models/UserProfile";
import { readNotification } from "../../../services/userService";
import "./NotificationCard.css";

interface Props {
  uid: string;
  notification: Notification;
  setLoaded: React.Dispatch<React.SetStateAction<number>>;
}

const NotificationCard = ({ uid, notification, setLoaded }: Props) => {
  const { refreshProfile } = useContext(AuthContext);
  const profile: UserProfile | null = useProfileFetcher(notification.uid);
  const navigate = useNavigate();
  const dataFetchedRef = useRef(false);

  useEffect(() => {
    if (profile) {
      if (dataFetchedRef.current) return;
      dataFetchedRef.current = true;
      setLoaded((oldValue) => oldValue + 1);
    }
  }, [profile, setLoaded]);

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
        <li
          className="NotificationCard"
          onClick={() => handleViewClick(notification)}
        >
          <div className="image-message-container">
            <div
              className="notification-dot"
              style={{
                backgroundColor: notification.read ? "transparent" : "#f0b202",
              }}
              onClick={(e) => handleReadClick(e)}
            ></div>
            <img src={profile.photoURL!} alt={profile.photoURL!} />
            <div className="notification-message">
              <p>{profile.username}</p>
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
          <p>{new Date(Number(notification.date)).toLocaleDateString()}</p>
        </li>
      )}
    </>
  );
};

export default NotificationCard;
