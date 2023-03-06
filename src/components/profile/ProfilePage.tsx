import Spinner from "react-bootstrap/Spinner";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import UserProfile from "../../models/UserProfile";
import "./ProfilePage.css";
import ProfileInfo from "./ProfileInfo";
import ProfileTripsContainer from "./ProfileTripsContainer";
import FollowContext from "../../context/FollowContext";
import { getUserByUid } from "../../services/userService";

const ProfilePage = () => {
  const { userProfile, refreshProfile } = useContext(AuthContext);
  const { friends } = useContext(FollowContext);
  const uid: string | undefined = useParams().uid;
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [followStatus, setFollowStatus] = useState("none");
  const [pastTripsCount, setPastTripsCount] = useState(0);

  useEffect(() => {
    if (uid) {
      getUserByUid(uid).then((response) => setProfile(response));
    }
  }, [uid, userProfile]);

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
    <main className="ProfilePage">
      {profile && userProfile ? (
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
        <div className="loading">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      )}
    </main>
  );
};

export default ProfilePage;
