import { useNavigate } from "react-router-dom";
import { Participant } from "../../../../models/Trip";

import "./ParticipantCard.css";

interface Props {
  participant: Participant;
}

const ParticipantCard = ({ participant }: Props) => {
  // variables
  const navigate = useNavigate();
  const { uid, username, photoURL } = participant.user;

  return (
    <li
      className="ParticipantCard"
      onClick={() => navigate(`/explorers/profile/${uid}`)}
    >
      <div className="image-container">
        <img
          src={photoURL}
          alt={photoURL}
          style={{ filter: participant.accepted ? "none" : "brightness(30%)" }}
          className="circle-image"
        />
        <p
          className="pending"
          style={{ display: participant.accepted ? "none" : "block" }}
        >
          Pending
        </p>
      </div>
      <p>{username}</p>
    </li>
  );
};

export default ParticipantCard;
