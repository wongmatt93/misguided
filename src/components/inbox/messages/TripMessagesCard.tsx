import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Trip, { Message } from "../../../models/Trip";
import { getUserByUid, readNotification } from "../../../services/userService";
import ListGroup from "react-bootstrap/ListGroup";
import "./TripMessagesCard.css";
import UserProfile, { Notification } from "../../../models/UserProfile";
import AuthContext from "../../../context/AuthContext";
import { getHhMm } from "../../../utils/dateFunctions";

interface Props {
  trip: Trip;
  userProfile: UserProfile;
}

const TripMessagesCard = ({ trip, userProfile }: Props) => {
  const { refreshProfile } = useContext(AuthContext);
  const navigate = useNavigate();
  const [unreadMessages, setUnreadMessages] = useState<Notification[]>([]);
  const [latestMessage, setLatestMessage] = useState<Message | null>(null);
  const [latestSender, setLatestSender] = useState("");

  const markRead = async (): Promise<void> => {
    await Promise.allSettled(
      unreadMessages.map((notif) =>
        readNotification(userProfile.uid, notif.uid, notif.date)
      )
    );
    refreshProfile(userProfile.uid);
  };

  useEffect(() => {
    setUnreadMessages(
      userProfile.notifications.filter(
        (notif) =>
          notif.type === "tripMessage" &&
          !notif.read &&
          notif.tripId === trip._id!
      )
    );
  }, [userProfile]);

  useEffect(() => {
    if (trip.messages.length > 0) {
      const latest: Message | undefined =
        trip.messages[trip.messages.length - 1];
      if (latest) {
        setLatestMessage(latest);
        getUserByUid(latest.uid).then((response) =>
          setLatestSender(response.username!)
        );
      }
    }
  }, [trip]);

  const handleViewClick = (): void => {
    navigate(`/inbox/thread/${trip._id!}`);
    markRead();
  };

  const handleReadClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ): void => {
    e.stopPropagation();
    markRead();
  };

  return (
    <ListGroup.Item className="TripMessagesCard" onClick={handleViewClick}>
      <div
        className="unread-count-container"
        style={{ display: unreadMessages.length > 0 ? "flex" : "none" }}
        onClick={(e) => handleReadClick(e)}
      >
        <p className="unread-count">{unreadMessages.length}</p>
      </div>
      <div className="image-message-container">
        <img src={trip.cityPhoto} alt={trip.cityPhoto} />
        <div className="trip-message-container">
          <p className="trip-name">
            {trip.cityName}: {trip.date1}
            {trip.date1 !== trip.date2 && ` - ${trip.date2}`}
          </p>
          {latestMessage ? (
            <p className="latest-message">
              {latestSender}: {latestMessage.text}
            </p>
          ) : (
            <p>Start chatting about your upcoming trip!</p>
          )}
        </div>
      </div>
      {latestMessage && (
        <p className="latest-message-time">{getHhMm(latestMessage.date)}</p>
      )}
    </ListGroup.Item>
  );
};

export default TripMessagesCard;
