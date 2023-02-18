import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Participant } from "../../../models/Trip";
import UserProfile from "../../../models/UserProfile";
import { getUserByUid } from "../../../services/userService";
import "./ParticipantCard.css";
import Tooltip from "react-bootstrap/esm/Tooltip";

interface Props {
  participant: Participant;
}

const ParticipantCard = ({ participant }: Props) => {
  const navigate = useNavigate();
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    getUserByUid(participant.uid).then((response) => setUserProfile(response));
  }, [participant]);

  const handleClick = (): void => navigate(`/profile/${participant.uid}`);

  return (
    <li className="ParticipantCard">
      {userProfile && (
        <OverlayTrigger
          placement="top"
          overlay={
            <Tooltip id="button-tooltip-2">{userProfile.displayName}</Tooltip>
          }
        >
          <img
            src={userProfile.photoURL!}
            alt={userProfile.photoURL!}
            onClick={handleClick}
          />
        </OverlayTrigger>
      )}
    </li>
  );
};

export default ParticipantCard;
