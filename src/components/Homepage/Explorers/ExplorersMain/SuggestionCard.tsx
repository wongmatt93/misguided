import { useState } from "react";
import { Button } from "react-bootstrap";
import { NavigateFunction, useNavigate } from "react-router-dom";

import { UserSummary } from "../../../../models/UserProfile";
import { followUser } from "../../../../utils/followFunctions";
import "./SuggestionCard.css";

interface Props {
  uid: string;
  suggestion: UserSummary;
  followers: UserSummary[];
  refreshProfile: () => Promise<void>;
}

const SuggestionCard = ({
  uid,
  suggestion,
  followers,
  refreshProfile,
}: Props) => {
  // variables
  const [updating, setUpdating] = useState<boolean>(false);
  const follower: boolean = followers.some(
    (follower) => follower.uid === suggestion.uid
  );
  const navigate: NavigateFunction = useNavigate();

  // functions
  const handleFollow = async (): Promise<void> => {
    setUpdating(true);
    await followUser(uid, suggestion.uid);
    await refreshProfile();
    setUpdating(false);
  };

  return (
    <li className="SuggestionCard">
      <div
        className="image-name-container"
        onClick={() => navigate(`profile/${suggestion.uid}`)}
      >
        <img
          src={suggestion.photoURL}
          alt={suggestion.username}
          className="circle-image"
        />
        <p className="username">{suggestion.username}</p>
      </div>
      <Button disabled={updating} variant="warning" onClick={handleFollow}>
        {follower ? "Follow Back" : "Follow"}
      </Button>
    </li>
  );
};

export default SuggestionCard;
