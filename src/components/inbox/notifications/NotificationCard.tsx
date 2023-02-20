import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import useProfileFetcher from "../../../hooks/useProfileFetcher";
import UserProfile, { Notification } from "../../../models/UserProfile";
import "./NotificationCard.css";

interface Props {
  notification: Notification;
  setLoaded: React.Dispatch<React.SetStateAction<number>>;
}

const NotificationCard = ({ notification, setLoaded }: Props) => {
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

  return (
    <>
      {profile && (
        <li
          className="NotificationCard"
          onClick={() => navigate(`/profile/${profile.uid}`)}
        >
          <div className="image-message-container">
            <div
              className="notification-dot"
              style={{
                backgroundColor: notification.read ? "transparent" : "#f0b202",
              }}
            ></div>
            <img src={profile.photoURL!} alt={profile.photoURL!} />
            {notification.type === "follow" && (
              <div className="notification-message">
                <p>{profile.username}</p>
                <p>started following you</p>
              </div>
            )}
          </div>
          <p>{new Date(Number(notification.date)).toLocaleDateString()}</p>
        </li>
      )}
    </>
  );
};

export default NotificationCard;
