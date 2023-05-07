import { useState } from "react";
import { Button } from "react-bootstrap";
import { NavigateFunction, useNavigate } from "react-router-dom";
import ActiveUserProfile, { UserProfile } from "../../../models/UserProfile";
import { followUser, getFollowStatus } from "../../../utils/followFunctions";
import "./SearchResultCard.css";

interface Props {
  userProfile: ActiveUserProfile;
  refreshProfile: () => Promise<void>;
  user: UserProfile;
}

const SearchResultCard = ({ userProfile, refreshProfile, user }: Props) => {
  const followStatus: string = getFollowStatus(userProfile, user.uid);
  const navigate: NavigateFunction = useNavigate();
  const [updating, setUpdating] = useState(false);

  const handleClick = (): void => navigate(`/explorers/profile/${user.uid}`);

  const handleFollow = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): Promise<void> => {
    e.stopPropagation();
    setUpdating(true);
    await followUser(userProfile, user);
    await refreshProfile();
    setUpdating(false);
  };

  return (
    <li className="SearchResultCard ExplorerCard" onClick={handleClick}>
      <div className="image-name-container">
        <img
          className="circle-image"
          src={user.photoURL!}
          alt={user.photoURL!}
        />
        <p className="username">{user.username}</p>
      </div>
      {followStatus === "none" ? (
        <Button disabled={updating} variant="warning" onClick={handleFollow}>
          Follow
        </Button>
      ) : followStatus === "friend" ? (
        <p className="status">Friends</p>
      ) : followStatus === "follower" ? (
        <Button disabled={updating} variant="warning" onClick={handleFollow}>
          Follow Back
        </Button>
      ) : (
        <p className="status">Followed</p>
      )}
    </li>
  );
};

export default SearchResultCard;
