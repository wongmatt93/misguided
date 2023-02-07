import { useContext } from "react";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import AuthContext from "../../context/AuthContext";
import FriendsContext from "../../context/FriendsContext";
import UserProfile, { Friend } from "../../models/UserProfile";
import { addFriend } from "../../services/userService";
import "./FriendButton.css";

interface Props {
  userProfile: UserProfile;
  otherProfile: UserProfile;
  friendStatus: string;
}

const FriendButton = ({ userProfile, otherProfile, friendStatus }: Props) => {
  const { refreshProfile } = useContext(AuthContext);
  const { handleAcceptFriend, handleDeleteFriend } = useContext(FriendsContext);

  const addFriendButton = (): void => {
    const user: Friend = {
      uid: userProfile.uid,
      friendRequestStatus: "received",
    };

    const newFriend: Friend = {
      uid: otherProfile.uid,
      friendRequestStatus: "requested",
    };

    addFriend(userProfile.uid, newFriend).then(() =>
      addFriend(newFriend.uid, user).then(() => refreshProfile(userProfile.uid))
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
          <Dropdown.Item
            onClick={() =>
              handleDeleteFriend(userProfile.uid, otherProfile.uid)
            }
          >
            Cancel Request
          </Dropdown.Item>
        </DropdownButton>
      ) : friendStatus === "received" ? (
        <DropdownButton variant="warning" title="Respond to Request">
          <Dropdown.Item
            onClick={() =>
              handleAcceptFriend(userProfile.uid, otherProfile.uid)
            }
          >
            Accept Request
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() =>
              handleDeleteFriend(userProfile.uid, otherProfile.uid)
            }
          >
            Deny Request
          </Dropdown.Item>
        </DropdownButton>
      ) : (
        <DropdownButton variant="warning" title="Friend">
          <Dropdown.Item
            onClick={() =>
              handleDeleteFriend(userProfile.uid, otherProfile.uid)
            }
          >
            Unfriend
          </Dropdown.Item>
        </DropdownButton>
      )}
    </div>
  );
};

export default FriendButton;
