import { UserProfile } from "../../../../models/UserProfile";
import "./ExplorerProfileInfo.css";
import FollowButton from "./FollowButton";

interface Props {
  uid: string;
  profile: UserProfile;
  completedTripsCount: number;
  refreshProfile: () => Promise<void>;
  refreshProfilePage: () => Promise<void>;
}

const ExplorerProfileInfo = ({
  uid,
  profile,
  completedTripsCount,
  refreshProfile,
  refreshProfilePage,
}: Props) => {
  // variables
  const { photoURL, displayName, followings, followers } = profile;

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
      {uid !== profile.uid && (
        <FollowButton
          uid={uid}
          profile={profile}
          refreshProfile={refreshProfile}
          refreshProfilePage={refreshProfilePage}
        />
      )}
    </div>
  );
};

export default ExplorerProfileInfo;
