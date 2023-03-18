import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate, NavigateFunction } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import UserProfile from "../../models/UserProfile";
import "./ProfilePage.css";
import { getUserByUid } from "../../services/userService";
import LoadingSpinner from "../common/LoadingSpinner";
import ProfileInfo from "./ProfileInfo";
import ProfileTripsContainer from "./ProfileTripsContainer";

const ProfilePage = () => {
  const { userProfile, refreshProfile } = useContext(AuthContext);
  const uid: string | undefined = useParams().uid;
  const navigate: NavigateFunction = useNavigate();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [followStatus, setFollowStatus] = useState("none");
  const [pastTripsCount, setPastTripsCount] = useState(0);

  console.log("why");

  useEffect(() => {
    if (uid) {
      getUserByUid(uid).then((response) => setProfile(response));

      if (!userProfile) {
        navigate(`/profile/${uid}`);
      } else {
        const isFollowing: boolean = userProfile.followingUids.some(
          (followingUid) => followingUid === uid
        );
        const isFollower: boolean = userProfile.followersUids.some(
          (followerUid) => followerUid === uid
        );

        isFollowing && isFollower
          ? setFollowStatus("friend")
          : isFollowing
          ? setFollowStatus("following")
          : isFollower
          ? setFollowStatus("follower")
          : setFollowStatus("none");
      }
    }
  }, [uid, userProfile, navigate]);

  return (
    <section className="ProfilePage">
      {profile ? (
        <>
          <ProfileInfo
            profile={profile}
            userProfile={userProfile}
            refreshProfile={refreshProfile}
            followStatus={followStatus}
            pastTripsCount={pastTripsCount}
          />
          <ProfileTripsContainer
            profile={profile}
            userProfile={userProfile}
            setPastTripsCount={setPastTripsCount}
          />
        </>
      ) : (
        <LoadingSpinner />
      )}
    </section>
  );
};

export default ProfilePage;
