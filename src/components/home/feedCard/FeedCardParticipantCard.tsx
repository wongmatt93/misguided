import { useNavigate } from "react-router-dom";
import { Participant } from "../../../models/Trip";
import UserProfile from "../../../models/UserProfile";
import "./FeedCardParticipantCard.css";
import useProfileFetcher from "../../../hooks/useProfileFetcher";

interface Props {
  participant: Participant;
}

const FeedCardParticipantCard = ({ participant }: Props) => {
  const navigate = useNavigate();
  const userProfile: UserProfile | null = useProfileFetcher(participant.uid);

  const handleClick = (): void => navigate(`/profile/${participant.uid}`);

  return (
    <>
      {userProfile && (
        <li className="FeedCardParticipantCard">
          <img
            className="participant-image"
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
