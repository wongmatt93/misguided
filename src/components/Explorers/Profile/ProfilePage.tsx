import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate, NavigateFunction } from "react-router-dom";
import AuthContext from "../../../context/AuthContext";
import UserProfile from "../../../models/UserProfile";
import "./ProfilePage.css";
import { getUserByUid } from "../../../services/userService";
import LoadingSpinner from "../../common/LoadingSpinner";
import ProfileInfo from "./ProfileInfo";
import ProfileTripsContainer from "./ProfileTripsContainer";

const ProfilePage = () => {
  const { userProfile, refreshProfile } = useContext(AuthContext);
  const uid: string | undefined = useParams().uid;
  const navigate: NavigateFunction = useNavigate();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [pastTripsCount, setPastTripsCount] = useState(0);

  useEffect(() => {
    !userProfile && navigate(`/profile/${uid}`);
  }, [userProfile, navigate, uid]);

  useEffect(() => {
    uid && getUserByUid(uid).then((response) => setProfile(response));
  }, [uid]);

  return (
    <section className="ProfilePage">
      {profile ? (
        <>
          <ProfileInfo
            profile={profile}
            userProfile={userProfile}
            refreshProfile={refreshProfile}
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
