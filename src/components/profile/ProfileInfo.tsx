import UserProfile from "../../models/UserProfile";
import FriendButton from "./FollowButton";
import "./ProfileInfo.css";

interface Props {
  profile: UserProfile;
  userProfile: UserProfile;
  followStatus: string;
  pastTripsCount: number;
}

const ProfileInfo = ({
  profile,
  userProfile,
  followStatus,
  pastTripsCount,
}: Props) => {
  return (
    <section className="ProfileInfo">
      <img
        className="profile-pic"
        src={profile.photoURL!}
        alt={profile.photoURL!}
      />
      <h2>{profile.displayName}</h2>
      <div className="counts">
        <div className="following-count">
          <p>{profile.following.length}</p>
          <p>following</p>
        </div>
        <div className="followers-count">
          <p>{profile.followers.length}</p>
          <p>followers</p>
        </div>
        <div className="trip-count">
          <p>{pastTripsCount}</p>
          <p>trips</p>
        </div>
      </div>
      {userProfile && userProfile!.uid !== profile.uid && (
        <FriendButton
          userProfile={userProfile}
          otherProfile={profile}
          followStatus={followStatus}
        />
      )}
    </section>
  );
};

export default ProfileInfo;
