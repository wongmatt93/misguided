import { useNavigate } from "react-router-dom";
import { TripUserProfile } from "../../../models/Trip";
import "./FeedCardParticipantCard.css";

interface Props {
  participant: TripUserProfile;
}

const FeedCardParticipantCard = ({ participant }: Props) => {
  const navigate = useNavigate();
  const { uid, username, photoURL } = participant;

  return (
    <li className="FeedCardParticipantCard">
      <img
        className="participant-image circle-image"
        src={photoURL!}
        alt={photoURL!}
        onClick={() => navigate(`/explorers/profile/${uid}`)}
      />
      <p className="username">{username}</p>
    </li>
  );
};

export default FeedCardParticipantCard;
