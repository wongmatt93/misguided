import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Trip, { Message } from "../../../models/Trip";
import { getUserByUid } from "../../../services/userService";
import "./TripMessagesCard.css";

interface Props {
  trip: Trip;
}

const TripMessagesCard = ({ trip }: Props) => {
  const navigate = useNavigate();
  const [latestMessage, setLatestMessage] = useState<Message | null>(null);
  const [latestSender, setLatestSender] = useState("");

  useEffect(() => {
    if (trip.messages.length > 0) {
      const index: number = trip.messages.length - 1;
      setLatestMessage(trip.messages[index]);
    }
  }, [trip]);

  useEffect(() => {
    latestMessage &&
      getUserByUid(latestMessage.uid).then((response) =>
        setLatestSender(response.username!)
      );
  }, [latestMessage]);

  const handleClick = (): void => navigate(`/messages/${trip._id!}`);

  return (
    <li className="TripMessagesCard" onClick={handleClick}>
      <div className="image-message-container">
        <div className="notification-dot"></div>
        <img src={trip.cityPhoto} alt={trip.cityPhoto} />
        <div className="trip-message-container">
          <p>
            {trip.cityName}: {trip.date1}
            {trip.date1 !== trip.date2 && ` - ${trip.date2}`}
          </p>
          {latestMessage ? (
            <p>
              {latestSender}: {latestMessage.text}
            </p>
          ) : (
            <p>Start chatting about your upcoming trip!</p>
          )}
        </div>
      </div>
      {latestMessage && (
        <p>{new Date(Number(latestMessage.date)).toDateString()}</p>
      )}
    </li>
  );
};

export default TripMessagesCard;
