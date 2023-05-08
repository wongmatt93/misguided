import { useNavigate } from "react-router-dom";
import { UserProfile } from "../../../models/UserProfile";
import "./FeedCardParticipantCard.css";

interface Props {
  participant: UserProfile;
}

const FeedCardParticipantCard = ({ participant }: Props) => {
  const navigate = useNavigate();

  const handleClick = (): void =>
    navigate(`/explorers/profile/${participant.uid}`);

  return (
    <li className="FeedCardParticipantCard">
      <img
        className="participant-image circle-image"
        src={participant.photoURL!}
        alt={participant.photoURL!}
        onClick={handleClick}
      />
      <p className="username">{participant.username}</p>
    </li>
  );
};

export default FeedCardParticipantCard;
