import { Button } from "react-bootstrap";
import { NavigateFunction, useNavigate } from "react-router-dom";
import useFollowStatus from "../../../hooks/useFollowStatus";
import UserProfile from "../../../models/UserProfile";
import { followUser } from "../../../utils/followFunctions";
import "./SearchResultCard.css";

interface Props {
  userProfile: UserProfile;
  refreshProfile: () => Promise<void>;
  user: UserProfile;
}

const SearchResultCard = ({ userProfile, refreshProfile, user }: Props) => {
  const followStatus: string = useFollowStatus(userProfile, user.uid);
  const navigate: NavigateFunction = useNavigate();

  const handleClick = (): void => navigate(`/explorers/profile/${user.uid}`);

  const handleFollow = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): Promise<void> => {
    e.stopPropagation();

    await followUser(userProfile, user);
    refreshProfile();
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
        <Button variant="warning" onClick={handleFollow}>
          Follow
        </Button>
      ) : followStatus === "friend" ? (
        <p className="status">Friends</p>
      ) : followStatus === "follower" ? (
        <Button variant="warning" onClick={handleFollow}>
          Follow Back
        </Button>
      ) : (
        <p className="status">Followed</p>
      )}
    </li>
  );
};

export default SearchResultCard;
