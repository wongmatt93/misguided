import { useState } from "react";
import { Button, Dropdown, DropdownButton } from "react-bootstrap";
import { UserProfile } from "../../../../models/UserProfile";
import {
  addFollowing,
  removeFollowing,
} from "../../../../services/userProfileServices";
import "./FollowButton.css";

interface Props {
  uid: string;
  explorer: UserProfile;
  refreshProfile: () => Promise<void>;
  refreshExplorerProfile: () => Promise<void>;
}

const FollowButton = ({
  uid,
  explorer,
  refreshProfile,
  refreshExplorerProfile,
}: Props) => {
  // variables
  const [updating, setUpdating] = useState(false);
  const { followings, followers } = explorer;
  const following: boolean = followers.some((follower) => follower.uid === uid);
  const follower: boolean = followings.some(
    (following) => following.uid === uid
  );
  const followStatus: string =
    following && follower
      ? "friends"
      : following
      ? "following"
      : follower
      ? "follower"
      : "none";

  // functions
  const handleFollowUser = async (): Promise<string | void> => {
    setUpdating(true);
    await addFollowing(uid, explorer.uid);
    await Promise.allSettled([refreshProfile(), refreshExplorerProfile()]);
    setUpdating(false);
  };

  const handleUnfollowUser = async (): Promise<void> => {
    setUpdating(true);
    await removeFollowing(uid, explorer.uid);
    await Promise.allSettled([refreshProfile(), refreshExplorerProfile()]);
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
      ) : followStatus === "friends" ? (
        <DropdownButton disabled={updating} variant="warning" title="Friends">
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
