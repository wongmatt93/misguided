import { useContext } from "react";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import FollowContext from "../../context/FollowContext";
import UserProfile from "../../models/UserProfile";
import "./FollowButton.css";

interface Props {
  userProfile: UserProfile;
  otherProfile: UserProfile;
  followStatus: string;
}

const FollowButton = ({ userProfile, otherProfile, followStatus }: Props) => {
  const { handleFollowUser, handleUnfollowUser } = useContext(FollowContext);

  const followButton = (): Promise<string | void> =>
    handleFollowUser(userProfile.uid, otherProfile.uid);

  const unfollowButton = (): Promise<void> =>
    handleUnfollowUser(userProfile.uid, otherProfile.uid);

  return (
    <div className="FollowButton">
      {followStatus === "none" ? (
        <Button variant="warning" onClick={followButton}>
          Follow
        </Button>
      ) : followStatus === "friend" ? (
        <DropdownButton variant="warning" title="Friend">
          <Dropdown.Item onClick={unfollowButton}>Unfollow</Dropdown.Item>
        </DropdownButton>
      ) : followStatus === "follower" ? (
        <DropdownButton variant="warning" title="Follow Back">
          <Dropdown.Item onClick={followButton}>Follow</Dropdown.Item>
        </DropdownButton>
      ) : (
        <DropdownButton variant="warning" title="Following">
          <Dropdown.Item onClick={unfollowButton}>Unfollow</Dropdown.Item>
        </DropdownButton>
      )}
    </div>
  );
};

export default FollowButton;
