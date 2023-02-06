import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import UserProfile from "../../models/UserProfile";
import "./ProfilePage.css";
import { getUserByUid } from "../../services/userService";
import FriendButton from "./FriendButton";

const ProfilePage = () => {
  const { userProfile } = useContext(AuthContext);
  const uid: string | undefined = useParams().uid;
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [friendStatus, setFriendStatus] = useState("not friends");

  useEffect(() => {
    uid &&
      userProfile &&
      getUserByUid(uid).then((response) => {
        if (response) {
          setProfile(response);

          const match = userProfile.friends.find(
            (friend) => response.uid === friend.uid
          );

          !match
            ? setFriendStatus("not friends")
            : match.friendRequestStatus === "accepted"
            ? setFriendStatus("accepted")
            : match.friendRequestStatus === "received"
            ? setFriendStatus("received")
            : setFriendStatus("requested");
        }
      });
  }, [userProfile, uid]);
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
        <>
          <h2>Profile Not Found</h2>
        </>
      )}
    </main>
  );
};

export default ProfilePage;
