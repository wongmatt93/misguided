import { NavigateFunction, useNavigate } from "react-router-dom";

import { UserSummary } from "../../../../models/UserProfile";
import "./FeedCardParticipantCard.css";

interface Props {
  user: UserSummary;
}

const FeedCardParticipantCard = ({ user }: Props) => {
  // variables
  const navigate: NavigateFunction = useNavigate();

  return (
    <li
      className="FeedCardParticipantCard"
      onClick={() => navigate(`/explorers/profile/${user.uid}`)}
    >
      <img
        className="participant-image circle-image"
        src={user.photoURL}
        alt={user.photoURL}
      />
      <p className="username">{user.username}</p>
    </li>
  );
};

export default FeedCardParticipantCard;
