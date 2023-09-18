import { useState } from "react";
import { Button } from "react-bootstrap";
import {
  RiDeleteBin5Fill,
  RiEyeFill,
  RiEyeOffFill,
  RiMore2Line,
} from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { Trip } from "../../../models/Trip";

import { Notification } from "../../../models/UserProfile";
import { getFullTripById } from "../../../services/tripServices";
import {
  deleteNotification,
  readNotification,
  unreadNotification,
} from "../../../services/userProfileServices";
import { timeStamp } from "../../../utils/dateFunctions";

import "./NotificationCard.css";

interface Props {
  uid: string;
  notification: Notification;
  refreshProfile: () => Promise<void>;
}

const NotificationCard = ({ uid, notification, refreshProfile }: Props) => {
  // variables
  const [active, setActive] = useState<boolean>(false);
  const navigate = useNavigate();
  const { user, date, type, read } = notification;
  const { photoURL, username } = user;

  // functions
  const tripUrl = async (tripId: string): Promise<string> => {
    const trip: Trip = await getFullTripById(tripId);
    const accepted: boolean = trip.participants.some(
      (participant) => participant.user.uid === uid && participant.accepted
    );
    if (accepted) {
      return `/trips/trip-details/${tripId}`;
    }
    return `/inbox/trip-details/${tripId}`;
  };

  const handleViewClick = async (): Promise<void> => {
    if (active) {
      setActive(false);
    } else {
      await readNotification(uid, user.uid, date);
      refreshProfile();
      notification.type === "follow" &&
        navigate(`/explorers/profile/${user.uid}`);
      notification.tripId && navigate(await tripUrl(notification.tripId));
    }
  };

  const handleSlideAction = (
    e: React.MouseEvent<SVGElement, MouseEvent>
  ): void => {
    e.stopPropagation();
    setActive(!active);
  };

  const handleReadClick = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): Promise<void> => {
    e.stopPropagation();
    notification.read
      ? await unreadNotification(uid, user.uid, date)
      : await readNotification(uid, user.uid, date);

    setActive(false);
    refreshProfile();
  };

  const handleDeleteClick = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): Promise<void> => {
    e.stopPropagation();
    await deleteNotification(uid, user.uid, date);
    refreshProfile();
  };

  return (
    <li className="NotificationCard" onClick={handleViewClick}>
      <div
        className="total-container"
        style={{
          left: active ? "-6.5rem" : "0",
          backgroundColor: notification.read ? "#f5f5f5" : "#FEEEC2",
        }}
      >
        <div className="image-message-container">
          <RiMore2Line
            className="more-button"
            onClick={(e) => handleSlideAction(e)}
          />
          <img src={photoURL} alt={username} className="circle-image" />
          <div className="notification-message">
            <p className="username">{username}</p>
            {type === "follow" && <p>started following you</p>}
            {type === "tripRequest" && <p>invited you on a trip!</p>}
            {type === "tripAccept" && <p>is joining your trip!</p>}
            {type === "tripDecline" && <p>is not joining your trip</p>}
            {type === "cityRating" && (
              <p>confirmed your trip. Rate the city!</p>
            )}
          </div>
        </div>
        <p>{timeStamp(date)}</p>
      </div>
      <div className="hidden-buttons">
        <Button
          aria-label={read ? "Mark Unread" : "Mark Read"}
          className="read-button"
          variant="warning"
          onClick={(e) => handleReadClick(e)}
        >
          {read ? <RiEyeOffFill /> : <RiEyeFill />}
        </Button>
        <Button
          aria-label="Delete Notification"
          className="delete-button"
          variant="danger"
          onClick={(e) => handleDeleteClick(e)}
        >
          <RiDeleteBin5Fill />
        </Button>
      </div>
    </li>
  );
};

export default NotificationCard;
