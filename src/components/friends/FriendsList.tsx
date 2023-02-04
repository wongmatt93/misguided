import { useContext, useState } from "react";
import AuthContext from "../../context/AuthContext";
import UserCard from "./UserCard";
import "./FriendsList.css";

const FriendsList = () => {
  const { userProfile } = useContext(AuthContext);
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="FriendsList">
      <input
        type="text"
        name="search"
        id="search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <ul>
        {userProfile &&
          userProfile.friends
            .filter((friend) => friend.friendRequestStatus === "accepted")
            .filter((friend) =>
              friend.displayName
                .toLowerCase()
                .includes(searchTerm.toLowerCase())
            )
            .map((friend) => <UserCard key={friend.uid} uid={friend.uid} />)}
      </ul>
    </div>
  );
};

export default FriendsList;
