import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import { useNavigate } from "react-router-dom";
import { Participant } from "../../../models/Trip";
import UserProfile from "../../../models/UserProfile";
import "./FeedCardParticipantCard.css";
import Tooltip from "react-bootstrap/esm/Tooltip";
import useGetUserByUid from "../../../hooks/useGetUserByUid";

interface Props {
  participant: Participant;
}

const FeedCardParticipantCard = ({ participant }: Props) => {
  const navigate = useNavigate();
  const userProfile: UserProfile | null = useGetUserByUid(participant.uid);

  const handleClick = (): void => navigate(`/profile/${participant.uid}`);

  return (
    <li className="FeedCardParticipantCard">
      {userProfile && (
        <OverlayTrigger
          placement="top"
          overlay={
            <Tooltip id="button-tooltip-2">{userProfile.displayName}</Tooltip>
          }
        >
          <img
            className="participant-image"
            src={userProfile.photoURL!}
            alt={userProfile.photoURL!}
            onClick={handleClick}
          />
        </OverlayTrigger>
      )}
    </li>
  );
};

export default FeedCardParticipantCard;
