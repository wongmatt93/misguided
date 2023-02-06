import { useContext } from "react";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import AuthContext from "../../context/AuthContext";
import UserProfile, { Friend } from "../../models/UserProfile";
import {
  acceptFriend,
  addFriend,
  deleteFriend,
  getUserByUid,
} from "../../services/userService";
import "./FriendButton.css";

interface Props {
  userProfile: UserProfile;
  otherProfile: UserProfile;
  friendStatus: string;
}

const FriendButton = ({ userProfile, otherProfile, friendStatus }: Props) => {
  const { refreshProfile } = useContext(AuthContext);

  const addFriendButton = (): void => {
    const user: Friend = {
      uid: userProfile.uid,
      displayName: userProfile.displayName,
      photoURL: userProfile.photoURL,
      friendRequestStatus: "received",
    };

    const newFriend: Friend = {
      uid: otherProfile.uid,
      displayName: otherProfile.displayName,
      photoURL: otherProfile.photoURL,
      friendRequestStatus: "requested",
    };

    addFriend(userProfile.uid, newFriend).then(() =>
      addFriend(newFriend.uid, user).then(() => refreshProfile(userProfile.uid))
    );
  };

  const deleteFriendButton = (): void => {
    deleteFriend(userProfile.uid, otherProfile.uid).then(() =>
      deleteFriend(otherProfile.uid, userProfile.uid).then(() =>
        refreshProfile(userProfile.uid)
      )
    );
  };

  const acceptFriendButton = (): void => {
    acceptFriend(userProfile.uid, otherProfile.uid).then(() =>
      acceptFriend(otherProfile.uid, userProfile.uid).then(() =>
        refreshProfile(userProfile.uid)
      )
    );
  };

  return (
    <div className="FriendButton">
      {friendStatus === "not friends" ? (
        <Button variant="warning" onClick={addFriendButton}>
          Add Friend
        </Button>
      ) : friendStatus === "requested" ? (
        <DropdownButton variant="warning" title="Requested">
          <Dropdown.Item onClick={deleteFriendButton}>
            Cancel Request
          </Dropdown.Item>
        </DropdownButton>
      ) : friendStatus === "received" ? (
        <DropdownButton variant="warning" title="Respond to Request">
          <Dropdown.Item onClick={acceptFriendButton}>
            Accept Request
          </Dropdown.Item>
          <Dropdown.Item onClick={deleteFriendButton}>
            Deny Request
          </Dropdown.Item>
        </DropdownButton>
      ) : (
        <DropdownButton variant="warning" title="Friend">
          <Dropdown.Item onClick={deleteFriendButton}>Unfriend</Dropdown.Item>
        </DropdownButton>
      )}
    </div>
  );
};

export default FriendButton;
