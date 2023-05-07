import { Button, Dropdown, DropdownButton } from "react-bootstrap";
import ActiveUserProfile from "../../../models/UserProfile";
import { followUser, getFollowStatus } from "../../../utils/followFunctions";
import "./FollowButton.css";
import { useState } from "react";
import { removeFollowing } from "../../../services/userService";
import { formatUserProfileToSave } from "../../../utils/userFunctions";

interface Props {
  userProfile: ActiveUserProfile;
  refreshProfile: () => Promise<void>;
  otherProfile: ActiveUserProfile;
  refreshProfilePage: (uid: string) => Promise<void>;
}

const FollowButton = ({
  userProfile,
  refreshProfile,
  otherProfile,
  refreshProfilePage,
}: Props) => {
  const { uid: otherUid } = otherProfile;
  const followStatus: string = getFollowStatus(userProfile, otherUid);
  const [updating, setUpdating] = useState(false);

  const handleFollowUser = async (): Promise<string | void> => {
    setUpdating(true);
    await followUser(userProfile, formatUserProfileToSave(otherProfile));
    await Promise.allSettled([refreshProfile(), refreshProfilePage(otherUid)]);
    setUpdating(false);
  };

  const handleUnfollowUser = async (): Promise<void> => {
    setUpdating(true);
    await removeFollowing(userProfile.uid, otherUid);
    await Promise.allSettled([refreshProfile(), refreshProfilePage(otherUid)]);
    setUpdating(false);
  };

  return (
    <div className="FollowButton">
      {followStatus === "none" ? (
        <Button
          disabled={updating}
          variant="warning"
          onClick={handleFollowUser}
        >
          Follow
        </Button>
      ) : followStatus === "friend" ? (
        <DropdownButton disabled={updating} variant="warning" title="Friend">
          <Dropdown.Item onClick={handleUnfollowUser}>Unfollow</Dropdown.Item>
        </DropdownButton>
      ) : followStatus === "follower" ? (
        <DropdownButton
          disabled={updating}
          variant="warning"
          title="Follow Back"
        >
          <Dropdown.Item onClick={handleFollowUser}>Follow</Dropdown.Item>
        </DropdownButton>
      ) : (
        <DropdownButton disabled={updating} variant="warning" title="Following">
          <Dropdown.Item onClick={handleUnfollowUser}>Unfollow</Dropdown.Item>
        </DropdownButton>
      )}
    </div>
  );
};

export default FollowButton;
