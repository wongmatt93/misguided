import { useNavigate } from "react-router-dom";
import Trip from "../../../../models/Trip";
import { UserProfile } from "../../../../models/UserProfile";
import "./ParticipantCard.css";

interface Props {
  participant: UserProfile;
  trip: Trip;
}

const ParticipantCard = ({ participant, trip }: Props) => {
  const navigate = useNavigate();
  const accepted: boolean = trip.participants.some(
    (item) => item.uid === participant.uid && item.accepted
  );

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
