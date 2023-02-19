import Spinner from "react-bootstrap/Spinner";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import UserProfile from "../../models/UserProfile";
import "./ProfilePage.css";
import useProfileFetcher from "../../hooks/useProfileFetcher";
import ProfileInfo from "./ProfileInfo";
import ProfileTripsContainer from "./ProfileTripsContainer";

const ProfilePage = () => {
  const { userProfile } = useContext(AuthContext);
  const uid: string | undefined = useParams().uid;
  const profile: UserProfile | null = useProfileFetcher(uid!);
  const [friendStatus, setFriendStatus] = useState("not friends");
  const [pastTripsCount, setPastTripsCount] = useState(0);

  useEffect(() => {
    if (profile && userProfile) {
      const match = userProfile.friends.find(
        (friend) => profile.uid === friend.uid
      );

      !match
        ? setFriendStatus("not friends")
        : match.friendRequestStatus === "accepted"
        ? setFriendStatus("accepted")
        : match.friendRequestStatus === "received"
        ? setFriendStatus("received")
        : setFriendStatus("requested");
    }
  }, [userProfile, profile]);

  return (
    <main className="ProfilePage">
      {profile && userProfile ? (
        <>
          <ProfileInfo
            profile={profile}
            userProfile={userProfile}
            friendStatus={friendStatus}
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
