import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate, NavigateFunction } from "react-router-dom";
import AuthContext from "../../../context/AuthContext";
import ActiveUserProfile from "../../../models/UserProfile";
import "./ProfilePage.css";
import { getUserProfile } from "../../../services/userService";
import LoadingSpinner from "../../common/LoadingSpinner";
import ProfileInfo from "./ProfileInfo";
import ProfileTripsContainer from "./ProfileTripsContainer";
import { today } from "../../../utils/dateFunctions";

const ProfilePage = () => {
  const { userProfile, refreshProfile } = useContext(AuthContext);
  const uid: string | undefined = useParams().uid;
  const navigate: NavigateFunction = useNavigate();
  const [profile, setProfile] = useState<ActiveUserProfile | null>(null);
  const [pastTripsCount, setPastTripsCount] = useState(0);

  const refreshProfilePage = async (uid: string): Promise<void> =>
    setProfile(await getUserProfile(uid, today.getTime().toString()));

  useEffect(() => {
    !userProfile && navigate(`/profile/${uid}`);
  }, [userProfile, navigate, uid]);

  useEffect(() => {
    uid && refreshProfilePage(uid);
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
            refreshProfilePage={refreshProfilePage}
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
