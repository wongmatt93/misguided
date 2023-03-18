import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useProfileFetcher from "../../../hooks/useProfileFetcher";
import UserProfile, { Notification } from "../../../models/UserProfile";
import {
  deleteNotification,
  readNotification,
  unreadNotification,
} from "../../../services/userService";
import ListGroup from "react-bootstrap/ListGroup";
import "./InboxNotificationCard.css";
import { timeStamp } from "../../../utils/dateFunctions";
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
import useTimer from "../../../hooks/useTimer";
import { Button } from "react-bootstrap";

interface Props {
  uid: string;
  notification: Notification;
  refreshProfile: () => Promise<void>;
}

const InboxNotificationCard = ({
  uid,
  notification,
  refreshProfile,
}: Props) => {
  const profile: UserProfile | null = useProfileFetcher(notification.uid);
  const navigate = useNavigate();
  const [active, setActive] = useState(false);
  const timesUp: boolean = useTimer(1000);

  const handleViewClick = async (notification: Notification): Promise<void> => {
    if (active) {
      setActive(false);
    } else {
      await readNotification(uid, notification.uid, notification.date);
      refreshProfile();
      notification.type === "follow" &&
        navigate(`/profile/${notification.uid}`);
      (notification.type === "tripRequest" ||
        notification.type === "tripAccept") &&
        navigate(`/trip-details/${notification.tripId}`);
      notification.type === "tripDecline" &&
        navigate(`/trip-details/${notification.tripId}`);
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
                navigate(`/trips/rating/${trip.cityId}`);
              } else {
                navigate(`/trips/rating/${trip.cityId}/subsequent`);
              }
            }
          }
        }
      }
    }
  };

  const handleReadClick = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): Promise<void> => {
    e.stopPropagation();
    notification.read
      ? await unreadNotification(uid, notification.uid, notification.date)
      : await readNotification(uid, notification.uid, notification.date);

    setActive(false);
    refreshProfile();
  };

  const handleSlideAction = (
    e: React.MouseEvent<SVGElement, MouseEvent>
  ): void => {
    e.stopPropagation();
    setActive(true);
  };

  const handleDeleteClick = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): Promise<void> => {
    e.stopPropagation();
    await deleteNotification(uid, notification.uid, notification.date);
    refreshProfile();
  };

  return (
    <>
      {profile && timesUp && (
        <ListGroup.Item
          className="InboxNotificationCard"
          onClick={() => handleViewClick(notification)}
        >
          <div
            className="total-container"
            style={{
              left: active ? "-6.5em" : "0",
              backgroundColor: notification.read ? "#f5f5f5" : "#FEEEC2",
            }}
          >
            <div className="image-message-container">
              <RiMore2Line
                className="more-button"
                onClick={(e) => handleSlideAction(e)}
              />
              <img
                src={profile.photoURL!}
                alt={profile.photoURL!}
                className="circle-image"
              />
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
            <p>{timeStamp(notification.date)}</p>
          </div>
          <div className="hidden-buttons">
            <Button
              className="read-button"
              variant="warning"
              onClick={(e) => handleReadClick(e)}
            >
              {notification.read ? <RiEyeOffFill /> : <RiEyeFill />}
            </Button>
            <Button
              className="delete-button"
              variant="danger"
              onClick={(e) => handleDeleteClick(e)}
            >
              <RiDeleteBin5Fill />
            </Button>
          </div>
        </ListGroup.Item>
      )}
    </>
  );
};

export default InboxNotificationCard;
