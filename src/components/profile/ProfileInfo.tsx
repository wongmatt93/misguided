import UserProfile from "../../models/UserProfile";
import FriendButton from "./FriendButton";
import "./ProfileInfo.css";

interface Props {
  profile: UserProfile;
  userProfile: UserProfile;
  friendStatus: string;
  pastTripsCount: number;
}

const ProfileInfo = ({
  profile,
  userProfile,
  friendStatus,
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
        <div className="friend-count">
          <p>{profile.friends.length}</p>
          <p>friends</p>
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
          friendStatus={friendStatus}
        />
      )}
    </section>
  );
};

export default ProfileInfo;
