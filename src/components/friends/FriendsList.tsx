import { useContext, useState } from "react";
import AuthContext from "../../context/AuthContext";
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
    </div>
  );
};

export default FriendsList;
