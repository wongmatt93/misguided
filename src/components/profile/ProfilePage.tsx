import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import AuthContext from "../../context/AuthContext";
import UserProfile from "../../models/UserProfile";
import "./ProfilePage.css";

const ProfilePage = () => {
  const { userProfile } = useContext(AuthContext);
  const uid: string | undefined = useParams().uid;
  const navigate = useNavigate();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [friendStatus, setFriendStatus] = useState("");

  useEffect(() => {
    // const profile: UserProfile | undefined = allUsers.find(
    //   (user) => user.uid === uid
    // );
    if (profile) {
      setProfile(profile);
      const match = userProfile!.friends.find(
        (friend) => profile!.uid === friend.uid
      );
      if (!match) {
        setFriendStatus("not friends");
      } else if (match.friendRequestStatus === "accepted") {
        setFriendStatus("accepted");
      } else if (match.friendRequestStatus === "received") {
        setFriendStatus("received");
      } else if (match.friendRequestStatus === "requested") {
        setFriendStatus("requested");
      }
    }
  }, [userProfile, uid]);

  const handleClick = (): void => {
    navigate(-1);
  };

  return (
    <main className="ProfilePage">
      {profile ? (
        <>
          <button onClick={handleClick}>Back</button>
          <h2>{`${profile.displayName}'s Profile`}</h2>
          {friendStatus === "not friends" ? (
            <Button variant="primary">Add Friend</Button>
          ) : friendStatus === "requested" ? (
            <DropdownButton variant="primary" title="Requested">
              <Dropdown.Item>Cancel Request</Dropdown.Item>
            </DropdownButton>
          ) : friendStatus === "received" ? (
            <DropdownButton variant="primary" title="Respond to Request">
              <Dropdown.Item>Accept Request</Dropdown.Item>
              <Dropdown.Item>Deny Request</Dropdown.Item>
            </DropdownButton>
          ) : (
            <DropdownButton variant="success" title="Friend">
              <Dropdown.Item>Unfriend</Dropdown.Item>
            </DropdownButton>
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
