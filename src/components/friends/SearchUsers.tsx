import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import FriendCard from "./UserCard";
import "./SearchUsers.css";

const SearchUsers = () => {
  const { userProfile } = useContext(AuthContext);

  return (
    <div className="SearchUsers">
      <ul>
        {/* {allUsers.length > 0 &&
          allUsers
            .filter((user) => user.uid !== userProfile!.uid)
            .map((user) => <FriendCard key={user.uid} uid={user.uid} />)} */}
      </ul>
    </div>
  );
};

export default SearchUsers;
