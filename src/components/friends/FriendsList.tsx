import Form from "react-bootstrap/Form";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/AuthContext";
import "./FriendsList.css";
import UserProfile from "../../models/UserProfile";
import FriendRequestList from "./FriendRequestList";
import AcceptedFriendsList from "./AcceptedFriendsList";
import { getAllUsersByUidArray } from "../../services/userService";

const FriendsList = () => {
  const { userProfile } = useContext(AuthContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [friends, setFriends] = useState<UserProfile[]>([]);
  const [friendRequests, setFriendRequests] = useState<UserProfile[]>([]);

  useEffect(() => {
    if (userProfile) {
      const friendUids: string[] = [];
      const requestUids: string[] = [];

      userProfile.friends.forEach((friend) => {
        if (friend.friendRequestStatus === "accepted") {
          friendUids.push(friend.uid);
        } else if (friend.friendRequestStatus === "received") {
          requestUids.push(friend.uid);
        }
      });

      if (friendUids.length > 0) {
        getAllUsersByUidArray(friendUids).then((response) =>
          setFriends(response)
        );
      } else {
        setFriends([]);
      }

      if (requestUids.length > 0) {
        getAllUsersByUidArray(requestUids).then((response) =>
          setFriendRequests(response)
        );
      } else {
        setFriendRequests([]);
      }
    }
  }, [userProfile]);

  return (
    <div className="FriendsList">
      <Form>
        <Form.Group controlId="email">
          <Form.Control
            type="email"
            placeholder="Search friends"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            required
          ></Form.Control>
        </Form.Group>
      </Form>
      {friendRequests.length > 0 && (
        <FriendRequestList
          friendRequests={friendRequests}
          searchTerm={searchTerm}
        />
      )}
      <AcceptedFriendsList friends={friends} searchTerm={searchTerm} />
    </div>
  );
};

export default FriendsList;
