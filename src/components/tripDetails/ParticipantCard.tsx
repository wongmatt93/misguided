import { useEffect, useState } from "react";
import UserProfile, { UserTrip } from "../../models/UserProfile";
import "./ParticipantCard.css";

interface Props {
  participant: UserProfile;
  tripId: string;
}

const ParticipantCard = ({ participant, tripId }: Props) => {
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
    <li className="ParticipantCard">
      <div className="image-container">
        <img
          src={participant.photoURL!}
          alt={participant.photoURL!}
          style={{ filter: accepted ? "none" : "brightness(30%)" }}
        />
        <p className="pending" style={{ display: accepted ? "none" : "block" }}>
          Pending
        </p>
      </div>
      <p>{participant.displayName}</p>
    </li>
  );
};

export default ParticipantCard;
