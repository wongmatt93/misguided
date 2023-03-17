import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import UserProfile from "../../models/UserProfile";
import "./ProfilePage.css";
import FollowContext from "../../context/FollowContext";
import { getUserByUid } from "../../services/userService";
import LoadingSpinner from "../common/LoadingSpinner";
import ProfileInfo from "./ProfileInfo";
import ProfileTripsContainer from "./ProfileTripsContainer";

const ProfilePage = () => {
  const { userProfile, refreshProfile } = useContext(AuthContext);
  const { friends } = useContext(FollowContext);
  const uid: string | undefined = useParams().uid;
  const navigate = useNavigate();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [followStatus, setFollowStatus] = useState("none");
  const [pastTripsCount, setPastTripsCount] = useState(0);

  useEffect(() => {
    if (!userProfile && uid) {
      navigate(`/profile/${uid}`);
    }
  }, [userProfile, uid, navigate]);

  useEffect(() => {
    if (uid) {
      getUserByUid(uid).then((response) => setProfile(response));
    }
  }, [uid]);

  useEffect(() => {
    if (profile && userProfile) {
      if (friends.some((friend) => friend.uid === profile.uid)) {
        setFollowStatus("friend");
      } else if (userProfile.followersUids.some((uid) => uid === profile.uid)) {
        setFollowStatus("follower");
      } else if (userProfile.followingUids.some((uid) => uid === profile.uid)) {
        setFollowStatus("following");
      } else {
        setFollowStatus("none");
      }
    }
  }, [userProfile, profile, friends]);

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
