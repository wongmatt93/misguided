import { useNavigate } from "react-router-dom";
import Trip, { Participant } from "../../../models/Trip";
import "./ParticipantCard.css";

interface Props {
  participant: Participant;
  trip: Trip;
}

const ParticipantCard = ({ participant, trip }: Props) => {
  const navigate = useNavigate();
  const { uid, profile } = participant;
  const accepted: boolean = trip.participants.some(
    (item) => item.uid === uid && item.accepted
  );

  return (
    <li
      className="ParticipantCard"
      onClick={() => navigate(`/explorers/profile/${uid}`)}
    >
      <div className="image-container">
        <img
          src={profile!.photoURL}
          alt={profile!.photoURL}
          style={{ filter: accepted ? "none" : "brightness(30%)" }}
          className="circle-image"
        />
        <p className="pending" style={{ display: accepted ? "none" : "block" }}>
          Pending
        </p>
      </div>
      <p>{profile!.username}</p>
    </li>
  );
};

export default ParticipantCard;
