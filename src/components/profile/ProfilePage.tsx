import Spinner from "react-bootstrap/Spinner";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import UserProfile from "../../models/UserProfile";
import "./ProfilePage.css";
import FriendButton from "./FriendButton";
import useGetUserByUid from "../../hooks/useGetUserByUid";

const ProfilePage = () => {
  const { userProfile } = useContext(AuthContext);
  const uid: string | undefined = useParams().uid;
  const profile: UserProfile | null = useGetUserByUid(uid!);
  const [friendStatus, setFriendStatus] = useState("not friends");

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
      {profile ? (
        <>
          <img src={profile.photoURL!} alt={profile.photoURL!} />
          <h2>{profile.displayName}</h2>
          {userProfile && userProfile!.uid !== profile.uid && (
            <FriendButton
              userProfile={userProfile}
              otherProfile={profile}
              friendStatus={friendStatus}
            />
          )}
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
