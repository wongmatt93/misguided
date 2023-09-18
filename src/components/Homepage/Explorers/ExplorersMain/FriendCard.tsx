import { RiArrowRightSLine } from "react-icons/ri";
import { NavigateFunction, useNavigate } from "react-router-dom";

import { UserSummary } from "../../../../models/UserProfile";
import "./FriendCard.css";

interface Props {
  friend: UserSummary;
}

const FriendCard = ({ friend }: Props) => {
  // variables
  const navigate: NavigateFunction = useNavigate();

  return (
    <li
      className="FriendCard"
      onClick={() => navigate(`profile/${friend.uid}`)}
    >
      <div className="image-name-container">
        <img
          src={friend.photoURL}
          alt={friend.username}
          className="circle-image"
        />
        <p className="username">{friend.username}</p>
      </div>
      <RiArrowRightSLine />
    </li>
  );
};

export default FriendCard;
