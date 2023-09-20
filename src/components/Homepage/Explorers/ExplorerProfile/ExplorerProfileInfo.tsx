import { UserProfile } from "../../../../models/UserProfile";
import "./ExplorerProfileInfo.css";
import FollowButton from "./FollowButton";

interface Props {
  uid: string;
  explorer: UserProfile;
  completedTripsCount: number;
  refreshProfile: () => Promise<void>;
  refreshExplorerProfile: () => Promise<void>;
}

const ExplorerProfileInfo = ({
  uid,
  explorer,
  completedTripsCount,
  refreshProfile,
  refreshExplorerProfile,
}: Props) => {
  // variables
  const { photoURL, displayName, followings, followers } = explorer;

  return (
    <div className="ExplorerProfileInfo">
      <img
        className="profile-pic circle-image"
        src={photoURL!}
        alt={photoURL!}
      />
      <h2>{displayName}</h2>
      <div className="counts">
        <div className="following-count">
          <p>{followings.length}</p>
          <p>following</p>
        </div>
        <div className="followers-count">
          <p>{followers.length}</p>
          <p>followers</p>
        </div>
        <div className="trip-count">
          <p>{completedTripsCount}</p>
          <p>trips</p>
        </div>
      </div>
      {uid !== explorer.uid && (
        <FollowButton
          uid={uid}
          explorer={explorer}
          refreshProfile={refreshProfile}
          refreshExplorerProfile={refreshExplorerProfile}
        />
      )}
    </div>
  );
};

export default ExplorerProfileInfo;
