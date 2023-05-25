import { useNavigate } from "react-router-dom";
import { Participant } from "../../../models/Trip";
import "./FeedCardParticipantCard.css";

interface Props {
  participant: Participant;
}

const FeedCardParticipantCard = ({ participant }: Props) => {
  const navigate = useNavigate();
  const { uid, profile } = participant;

  return (
    <li className="FeedCardParticipantCard">
      <img
        className="participant-image circle-image"
        src={profile!.photoURL}
        alt={profile!.photoURL}
        onClick={() => navigate(`/explorers/profile/${uid}`)}
      />
      <p className="username">{profile!.username}</p>
    </li>
  );
};

export default FeedCardParticipantCard;
