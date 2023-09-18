import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { NavigateFunction, useNavigate } from "react-router-dom";

import { UserSummary } from "../../../../models/UserProfile";
import { followUser } from "../../../../utils/followFunctions";
import "./SearchResultCard.css";

interface Props {
  uid: string;
  searchResult: UserSummary;
  friends: UserSummary[];
  followers: UserSummary[];
  refreshProfile: () => Promise<void>;
}

const SearchResultCard = ({
  uid,
  searchResult,
  friends,
  followers,
  refreshProfile,
}: Props) => {
  // variables
  const [updating, setUpdating] = useState<boolean>(false);
  const [friendStatus, setFriendStatus] = useState<string>("none");
  const navigate: NavigateFunction = useNavigate();

  // functions
  const handleFollow = async (): Promise<void> => {
    setUpdating(true);
    await followUser(uid, searchResult.uid);
    await refreshProfile();
    setUpdating(false);
  };

  useEffect(() => {
    friends.some((friend) => friend.uid === searchResult.uid)
      ? setFriendStatus("friend")
      : followers.some((follower) => follower.uid === searchResult.uid)
      ? setFriendStatus("follower")
      : setFriendStatus("none");
  }, [friends, followers, searchResult]);

  return (
    <li className="SearchResultCard">
      <div
        className="image-name-container"
        onClick={() => navigate(`profile/${searchResult.uid}`)}
      >
        <img
          src={searchResult.photoURL}
          alt={searchResult.username}
          className="circle-image"
        />
        <p className="username">{searchResult.username}</p>
      </div>
      {friendStatus === "friend" && (
        <p onClick={() => navigate(`profile/${searchResult.uid}`)}>Friend</p>
      )}
      {friendStatus !== "friend" && (
        <Button disabled={updating} variant="warning" onClick={handleFollow}>
          {friendStatus === "follower" ? "Follow Back" : "Follow"}
        </Button>
      )}
    </li>
  );
};

export default SearchResultCard;
