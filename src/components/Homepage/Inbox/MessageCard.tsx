import { useState } from "react";
import { Message, Trip } from "../../../models/Trip";
import { Notification } from "../../../models/UserProfile";
import { readNotification } from "../../../services/userProfileServices";
import { timeStamp } from "../../../utils/dateFunctions";
import TripMessagesOffcanvas from "../Offcanvases/TripMessages/TripMessagesOffcanvas";
import "./MessageCard.css";

interface Props {
  uid: string;
  trip: Trip;
  notifications: Notification[];
  refreshProfile: () => Promise<void>;
}

const MessageCard = ({ uid, trip, notifications, refreshProfile }: Props) => {
  // variables
  const [show, setShow] = useState<boolean>(false);
  const { _id, city, nickname, startDate, endDate, messages, participants } =
    trip;
  const latestMessage: Message | undefined = messages[messages.length - 1];
  const imagePath: string =
    process.env.PUBLIC_URL + `/assets/cities/${city.photoURL}`;
  const unreadMessages: Notification[] = notifications.filter(
    (notif) => !notif.read && notif.tripId === _id
  );

  // functions
  const markRead = async (): Promise<void> => {
    await Promise.allSettled(
      unreadMessages.map((notif) =>
        readNotification(uid, notif.user.uid, notif.date)
      )
    );
    refreshProfile();
  };

  const handleShow = async (): Promise<void> => {
    setShow(true);
    await markRead();
  };
  const handleClose = async (): Promise<void> => {
    await markRead();
    setShow(false);
  };

  return (
    <li
      className="MessageCard"
      style={{
        backgroundColor: unreadMessages.length > 0 ? "#FEEEC2" : "#f5f5f5",
      }}
    >
      <div className="image-message-container" onClick={handleShow}>
        <img src={imagePath} alt={city.cityName} className="circle-image" />
        <div className="trip-message-container">
          {nickname ? (
            <p>{nickname}</p>
          ) : (
            <p className="trip-name">
              {city.cityName}:{" "}
              {new Date(Number(startDate)).toLocaleDateString()}
              {startDate !== endDate &&
                ` - ${new Date(Number(endDate)).toLocaleDateString()}`}
            </p>
          )}
          {latestMessage ? (
            <p className="latest-message">{latestMessage.text}</p>
          ) : (
            <p>Start chatting about your upcoming trip!</p>
          )}
        </div>
      </div>
      {latestMessage && (
        <p className="latest-message-time" onClick={handleShow}>
          {timeStamp(latestMessage.date)}
        </p>
      )}
      <TripMessagesOffcanvas
        uid={uid}
        tripId={_id!}
        tripName={nickname || city.cityName.toLowerCase()}
        messages={messages}
        participants={participants}
        refreshProfile={refreshProfile}
        show={show}
        handleClose={handleClose}
      />
    </li>
  );
};

export default MessageCard;
