import { useEffect, useRef, useState } from "react";
import { Spinner } from "react-bootstrap";
import Trip from "../../models/Trip";
import TripMessage from "./TripMessage";
import "./TripMessagesContainer.css";

interface Props {
  trip: Trip;
}

const TripMessagesContainer = ({ trip }: Props) => {
  const [count, setCount] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const dataFetchedRef = useRef(false);

  useEffect(() => {
    if (dataFetchedRef.current) return;
    if (count === trip.messages.length) {
      dataFetchedRef.current = true;
      setLoaded(true);
    }
  }, [count]);

  return (
    <div className="TripMessagesContainer">
      <ul
        style={{
          display: loaded ? "block" : "none",
        }}
      >
        {trip.messages.map((message) => (
          <TripMessage
            key={message.date + message.uid}
            message={message}
            setCount={setCount}
          />
        ))}
      </ul>
      {trip && !loaded && (
        <div className="loading">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      )}
    </div>
  );
};

export default TripMessagesContainer;
