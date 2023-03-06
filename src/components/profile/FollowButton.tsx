import { Button, Dropdown, DropdownButton } from "react-bootstrap";
import { Notification } from "../../models/UserProfile";
import UserProfile from "../../models/UserProfile";
import {
  addFollower,
  addFollowing,
  addNotification,
  removeFollower,
  removeFollowing,
} from "../../services/userService";
import { createFollowNotif } from "../../utils/notificationsFunctions";
import "./FollowButton.css";

interface Props {
  userProfile: UserProfile;
  refreshProfile: () => Promise<void>;
  otherProfile: UserProfile;
  followStatus: string;
}

const FollowButton = ({
  userProfile,
  refreshProfile,
  otherProfile,
  followStatus,
}: Props) => {
  const handleFollowUser = async (): Promise<string | void> => {
    const newNotification: Notification = createFollowNotif(userProfile.uid);

    await Promise.allSettled([
      addFollowing(userProfile.uid, otherProfile.uid),
      addFollower(otherProfile.uid, userProfile.uid),
      addNotification(otherProfile.uid, newNotification),
    ]);
    refreshProfile();
  };

  const handleUnfollowUser = async (): Promise<void> => {
    await Promise.allSettled([
      removeFollowing(userProfile.uid, otherProfile.uid),
      await removeFollower(otherProfile.uid, userProfile.uid),
    ]);
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
