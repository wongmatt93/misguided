import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  RiDeleteBin5Fill,
  RiEyeFill,
  RiEyeOffFill,
  RiMore2Line,
} from "react-icons/ri";
import { Button, ListGroup } from "react-bootstrap";
import useProfileFetcher from "../../../hooks/useProfileFetcher";
import useTimer from "../../../hooks/useTimer";
import { timeStamp } from "../../../utils/dateFunctions";
import { getFullTripById } from "../../../services/tripServices";
import {
  deleteNotification,
  readNotification,
  unreadNotification,
} from "../../../services/userService";
import FullTrip from "../../../models/Trip";
import UserProfile, { Notification } from "../../../models/UserProfile";
import "./InboxNotificationCard.css";

interface Props {
  userProfile: UserProfile;
  notification: Notification;
  refreshProfile: () => Promise<void>;
}

const InboxNotificationCard = ({
  userProfile,
  notification,
  refreshProfile,
}: Props) => {
  const profile: UserProfile | null = useProfileFetcher(notification.uid);
  const navigate = useNavigate();
  const [active, setActive] = useState(false);
  const timesUp: boolean = useTimer(1000);

  const tripUrl = async (tripId: string): Promise<string> => {
    const trip: FullTrip = await getFullTripById(tripId);
    const accepted: boolean = trip.participants.some(
      (participant) =>
        participant.uid === userProfile.uid && participant.accepted
    );
    if (accepted) {
      return `/trips/trip-details/${tripId}`;
    }
    return `/inbox/trip-details/${tripId}`;
  };

  const handleViewClick = async (notification: Notification): Promise<void> => {
    if (active) {
      setActive(false);
    } else {
      await readNotification(
        userProfile.uid,
        notification.uid,
        notification.date
      );
      refreshProfile();
      notification.type === "follow" &&
        navigate(`/explorers/profile/${notification.uid}`);
      notification.tripId && navigate(await tripUrl(notification.tripId));
      if (notification.type === "cityRating") {
        const trip: FullTrip | null = await getFullTripById(
          notification.tripId!
        );

        if (trip) {
          if (notification.read) {
            navigate(`/trip/${notification.tripId}`);
          } else {
            const firstVisit: boolean = !trip.city.ratings.some(
              (user) => user.uid === userProfile.uid
            );
            if (firstVisit) {
              navigate(`/trips/rating/${trip.city._id}`);
            } else {
              navigate(`/trips/rating/${trip.city._id}/subsequent`);
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
      ? await unreadNotification(
          userProfile.uid,
          notification.uid,
          notification.date
        )
      : await readNotification(
          userProfile.uid,
          notification.uid,
          notification.date
        );

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
    await deleteNotification(
      userProfile.uid,
      notification.uid,
      notification.date
    );
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
