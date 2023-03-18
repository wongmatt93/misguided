import { RiQuestionAnswerFill } from "react-icons/ri";
import { useEffect, useRef, useState } from "react";
import Trip from "../../models/Trip";
import TripMessage from "./TripMessage";
import "./TripMessagesContainer.css";
import LoadingSpinner from "../common/LoadingSpinner";

interface Props {
  trip: Trip;
  userUid: string;
}

const TripMessagesContainer = ({ trip, userUid }: Props) => {
  const [count, setCount] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const dataFetchedRef = useRef(false);
  const messagesEnd = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (dataFetchedRef.current) return;
    if (count === trip.messages.length) {
      dataFetchedRef.current = true;
      setLoaded(true);
    }
  }, [trip, count]);

  useEffect(() => {
    messagesEnd.current &&
      messagesEnd.current.scrollIntoView({ behavior: "smooth" });
  });

  return (
    <div className="TripMessagesContainer">
      {trip.messages.length > 0 ? (
        <>
          <ul
            style={{
              display: loaded ? "block" : "none",
            }}
          >
            {trip.messages.map((message) => (
              <TripMessage
                key={message.date + message.uid}
                message={message}
                userUid={userUid}
                setCount={setCount}
              />
            ))}
          </ul>
          <div ref={messagesEnd} />
        </>
      ) : (
        <div className="empty">
          <RiQuestionAnswerFill />
          <p>No messages yet</p>
          <p>Start chatting about your upcoming trip!</p>
        </div>
      )}
      {trip && !loaded && <LoadingSpinner />}
    </div>
  );
};

export default TripMessagesContainer;
