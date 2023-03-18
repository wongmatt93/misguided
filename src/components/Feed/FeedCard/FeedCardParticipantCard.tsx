import { useNavigate } from "react-router-dom";
import UserProfile from "../../../models/UserProfile";
import "./FeedCardParticipantCard.css";
import useProfileFetcher from "../../../hooks/useProfileFetcher";

interface Props {
  participant: string;
}

const FeedCardParticipantCard = ({ participant }: Props) => {
  const navigate = useNavigate();
  const userProfile: UserProfile | null = useProfileFetcher(participant);

  const handleClick = (): void => navigate(`/explorers/profile/${participant}`);

  return (
    <>
      {userProfile && (
        <li className="FeedCardParticipantCard">
          <img
            className="participant-image circle-image"
            src={userProfile.photoURL!}
            alt={userProfile.photoURL!}
            onClick={handleClick}
          />
          <p className="username">{userProfile.username}</p>
        </li>
      )}
    </>
  );
};

export default FeedCardParticipantCard;
