import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { NavigateFunction, useNavigate } from "react-router-dom";
import UserProfile, { Notification } from "../../../models/UserProfile";
import {
  addFollower,
  addFollowing,
  addNotification,
} from "../../../services/userService";
import { createFollowNotif } from "../../../utils/notificationsFunctions";
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
  const [follower, setFollower] = useState(false);

  useEffect(() => {
    setFollower(userProfile.followersUids.includes(suggested.uid));
  }, [suggested, userProfile]);

  const handleClick = (): void =>
    navigate(`/explorers/profile/${suggested.uid}`);

  const handleFollow = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): Promise<void> => {
    e.stopPropagation();

    const newNotification: Notification = createFollowNotif(userProfile.uid);

    await Promise.allSettled([
      addFollowing(userProfile.uid, suggested.uid),
      addFollower(suggested.uid, userProfile.uid),
      addNotification(suggested.uid, newNotification),
    ]);
    refreshProfile();
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
      <Button variant="warning" onClick={(e) => handleFollow(e)}>
        {follower ? "Follow Back" : "Follow"}
      </Button>
    </li>
  );
};

export default ExplorerSuggestionCard;
