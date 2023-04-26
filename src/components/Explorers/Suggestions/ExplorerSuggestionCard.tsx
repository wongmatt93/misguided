import { useState } from "react";
import { Button } from "react-bootstrap";
import { NavigateFunction, useNavigate } from "react-router-dom";
import useFollowStatus from "../../../hooks/useFollowStatus";
import UserProfile from "../../../models/UserProfile";
import { followUser } from "../../../utils/followFunctions";
import "./ExplorerSuggestionCard.css";

interface Props {
  suggested: UserProfile;
  userProfile: UserProfile;
  refreshProfile: () => Promise<void>;
}

const ExplorerSuggestionCard = ({
  suggested,
  userProfile,
  refreshProfile,
}: Props) => {
  const navigate: NavigateFunction = useNavigate();
  const followStatus: string = useFollowStatus(userProfile, suggested.uid);
  const [updating, setUpdating] = useState(false);

  const handleClick = (): void =>
    navigate(`/explorers/profile/${suggested.uid}`);

  const handleFollow = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): Promise<void> => {
    e.stopPropagation();
    setUpdating(true);
    await followUser(userProfile, suggested);
    await refreshProfile();
    setUpdating(false);
  };

  return (
    <li className="ExplorerSuggestionCard ExplorerCard" onClick={handleClick}>
      <div className="image-name-container">
        <img
          className="circle-image"
          src={suggested.photoURL!}
          alt={suggested.photoURL!}
        />
        <p className="username">{suggested.username}</p>
      </div>
      <Button
        disabled={updating}
        variant="warning"
        onClick={(e) => handleFollow(e)}
      >
        {followStatus === "follower" ? "Follow Back" : "Follow"}
      </Button>
    </li>
  );
};

export default ExplorerSuggestionCard;
