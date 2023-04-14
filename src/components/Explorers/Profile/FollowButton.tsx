import { Button, Dropdown, DropdownButton } from "react-bootstrap";
import UserProfile from "../../../models/UserProfile";
import useFollowStatus from "../../../hooks/useFollowStatus";
import { followUser, unfollowUser } from "../../../utils/followFunctions";
import "./FollowButton.css";

interface Props {
  userProfile: UserProfile;
  refreshProfile: () => Promise<void>;
  otherProfile: UserProfile;
}

const FollowButton = ({ userProfile, refreshProfile, otherProfile }: Props) => {
  const followStatus: string = useFollowStatus(userProfile, otherProfile.uid);

  const handleFollowUser = async (): Promise<string | void> => {
    await followUser(userProfile, otherProfile);
    refreshProfile();
  };

  const handleUnfollowUser = async (): Promise<void> => {
    await unfollowUser(userProfile, otherProfile);
    refreshProfile();
  };

  return (
    <div className="FollowButton">
      {followStatus === "none" ? (
        <Button variant="warning" onClick={handleFollowUser}>
          Follow
        </Button>
      ) : followStatus === "friend" ? (
        <DropdownButton variant="warning" title="Friend">
          <Dropdown.Item onClick={handleUnfollowUser}>Unfollow</Dropdown.Item>
        </DropdownButton>
      ) : followStatus === "follower" ? (
        <DropdownButton variant="warning" title="Follow Back">
          <Dropdown.Item onClick={handleFollowUser}>Follow</Dropdown.Item>
        </DropdownButton>
      ) : (
        <DropdownButton variant="warning" title="Following">
          <Dropdown.Item onClick={handleUnfollowUser}>Unfollow</Dropdown.Item>
        </DropdownButton>
      )}
    </div>
  );
};

export default FollowButton;
