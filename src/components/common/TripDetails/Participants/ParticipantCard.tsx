import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserProfile, { UserTrip } from "../../../../models/UserProfile";
import "./ParticipantCard.css";

interface Props {
  participant: UserProfile;
  tripId: string;
}

const ParticipantCard = ({ participant, tripId }: Props) => {
  const navigate = useNavigate();
  const [accepted, setAccepted] = useState(false);

  useEffect(() => {
    const trip: UserTrip | undefined = participant.trips.find(
      (trip) => trip.tripId === tripId
    );

    if (trip) {
      if (trip.accepted) {
        setAccepted(true);
      }
    }
  }, [participant, tripId]);

  return (
    <li
      className="ParticipantCard"
      onClick={() => navigate(`/explorers/profile/${participant.uid}`)}
    >
      <div className="image-container">
        <img
          src={participant.photoURL!}
          alt={participant.photoURL!}
          style={{ filter: accepted ? "none" : "brightness(30%)" }}
          className="circle-image"
        />
        <p className="pending" style={{ display: accepted ? "none" : "block" }}>
          Pending
        </p>
      </div>
      <p>{participant.username}</p>
    </li>
  );
};

export default ParticipantCard;
