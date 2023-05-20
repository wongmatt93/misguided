import { useNavigate } from "react-router-dom";
import { Participant } from "../../../models/Trip";
import "./FeedCardParticipantCard.css";

interface Props {
  participant: Participant;
}

const FeedCardParticipantCard = ({ participant }: Props) => {
  const navigate = useNavigate();

  const handleClick = (): void =>
    navigate(`/explorers/profile/${participant.uid}`);

  return (
    <li className="FeedCardParticipantCard">
      <img
        className="participant-image circle-image"
        src={participant.profile!.photoURL!}
        alt={participant.profile!.photoURL!}
        onClick={handleClick}
      />
      <p className="username">{participant.profile!.username}</p>
    </li>
  );
};

export default FeedCardParticipantCard;
