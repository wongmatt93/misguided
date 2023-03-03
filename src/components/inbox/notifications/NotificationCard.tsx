import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../../context/AuthContext";
import useProfileFetcher from "../../../hooks/useProfileFetcher";
import UserProfile, { Notification } from "../../../models/UserProfile";
import {
  deleteNotification,
  readNotification,
  unreadNotification,
} from "../../../services/userService";
import ListGroup from "react-bootstrap/ListGroup";
import "./NotificationCard.css";
import { getHhMm } from "../../../utils/dateFunctions";
import { getTripById } from "../../../services/tripServices";
import Trip from "../../../models/Trip";
import { getCityById } from "../../../services/cityService";
import City from "../../../models/City";
import {
  RiDeleteBin5Fill,
  RiEyeFill,
  RiEyeOffFill,
  RiMore2Line,
} from "react-icons/ri";

interface Props {
  uid: string;
  notification: Notification;
}

const NotificationCard = ({ uid, notification }: Props) => {
  const { refreshProfile } = useContext(AuthContext);
  const profile: UserProfile | null = useProfileFetcher(notification.uid);
  const navigate = useNavigate();
  const [active, setActive] = useState(false);

  const handleViewClick = async (notification: Notification): Promise<void> => {
    if (active) {
      setActive(false);
    } else {
      await readNotification(uid, notification.uid, notification.date);
      refreshProfile(uid);
      notification.type === "follow" &&
        navigate(`/profile/${notification.uid}`);
      (notification.type === "tripRequest" ||
        notification.type === "tripAccept") &&
        navigate(`/trip/${notification.tripId}`);
      notification.type === "tripDecline" &&
        navigate(`/trip/${notification.tripId}`);
      if (notification.type === "cityRating") {
        const trip: Trip | null = await getTripById(notification.tripId!);

        if (trip) {
          const city: City | null = await getCityById(trip.cityId);

          if (city) {
            if (notification.read) {
              navigate(`/trip/${notification.tripId}`);
            } else {
              const firstVisit: boolean = !city.ratings.some(
                (user) => user.uid === uid
              );
              if (firstVisit) {
                navigate(`/rating/${trip.cityId}`);
              } else {
                navigate(`/rating/${trip.cityId}/subsequent`);
              }
            }
          }
        }
      }
    }
  };

  const handleReadClick = async (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ): Promise<void> => {
    e.stopPropagation();
    notification.read
      ? await unreadNotification(uid, notification.uid, notification.date)
      : await readNotification(uid, notification.uid, notification.date);

    setActive(false);
    refreshProfile(uid);
  };

  const handleSlideAction = (
    e: React.MouseEvent<SVGElement, MouseEvent>
  ): void => {
    e.stopPropagation();
    setActive(true);
  };

  const handleDeleteClick = async (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ): Promise<void> => {
    e.stopPropagation();
    await deleteNotification(uid, notification.uid, notification.date);
    refreshProfile(uid);
  };

  return (
    <>
      {profile && (
        <ListGroup.Item
          className="NotificationCard"
          onClick={() => handleViewClick(notification)}
        >
          <div
            className="notification-dot"
            style={{
              backgroundColor: notification.read ? "transparent" : "#f0b202",
            }}
          ></div>
          <div
            className="total-container"
            style={{ left: active ? "-6em" : "0" }}
          >
            <div className="image-message-container">
              <RiMore2Line onClick={(e) => handleSlideAction(e)} />
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
                {notification.type === "cityRating" && (
                  <p>confirmed your trip. Rate the city!</p>
                )}
              </div>
            </div>
            <p>{getHhMm(notification.date)}</p>
          </div>
          <div className="hidden-buttons">
            <div className="read-button" onClick={(e) => handleReadClick(e)}>
              {notification.read ? <RiEyeOffFill /> : <RiEyeFill />}
            </div>
            <div
              className="delete-button"
              onClick={(e) => handleDeleteClick(e)}
            >
              <RiDeleteBin5Fill />
            </div>
          </div>
        </ListGroup.Item>
      )}
    </>
  );
};

export default NotificationCard;
