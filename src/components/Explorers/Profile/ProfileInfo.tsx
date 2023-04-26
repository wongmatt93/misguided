import { useEffect, useState } from "react";
import UserProfile from "../../../models/UserProfile";
import { getUserFollowers } from "../../../services/userService";
import FollowButton from "./FollowButton";
import "./ProfileInfo.css";

interface Props {
  profile: UserProfile;
  userProfile: UserProfile | undefined;
  refreshProfile: () => Promise<void>;
  pastTripsCount: number;
  refreshProfilePage: (uid: string) => Promise<void>;
}

const ProfileInfo = ({
  profile,
  userProfile,
  refreshProfile,
  pastTripsCount,
  refreshProfilePage,
}: Props) => {
  const [followers, setFollowers] = useState<UserProfile[]>([]);

  useEffect(() => {
    getUserFollowers(profile.uid).then((response) => setFollowers(response));
  }, [profile]);

  return (
    <section className="ProfileInfo">
      <img
        className="profile-pic circle-image"
        src={profile.photoURL!}
        alt={profile.photoURL!}
      />
      <h2>{profile.displayName}</h2>
      <div className="counts">
        <div className="following-count">
          <p>{profile.followingUids.length}</p>
          <p>following</p>
        </div>
        <div className="followers-count">
          <p>{followers.length}</p>
          <p>followers</p>
        </div>
        <div className="trip-count">
          <p>{pastTripsCount}</p>
          <p>trips</p>
        </div>
      </div>
      {userProfile && userProfile!.uid !== profile.uid && (
        <FollowButton
          userProfile={userProfile}
          refreshProfile={refreshProfile}
          otherProfile={profile}
          refreshProfilePage={refreshProfilePage}
        />
      )}
    </section>
  );
};

export default ProfileInfo;
