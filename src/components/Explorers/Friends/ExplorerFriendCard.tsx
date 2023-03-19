import { RiArrowRightSLine } from "react-icons/ri";
import { NavigateFunction, useNavigate } from "react-router-dom";
import UserProfile from "../../../models/UserProfile";
import "./ExplorerFriendCard.css";

interface Props {
  friend: UserProfile;
}

const ExplorerFriendCard = ({ friend }: Props) => {
  const navigate: NavigateFunction = useNavigate();

  const handleClick = (): void => navigate(`/explorers/profile/${friend.uid}`);

  return (
    <li className="ExplorerFriendCard ExplorerCard" onClick={handleClick}>
      <div className="image-name-container">
        <img
          className="circle-image"
          src={friend.photoURL!}
          alt={friend.photoURL!}
        />
        <p className="username">{friend.username}</p>
      </div>
      <RiArrowRightSLine />
    </li>
  );
};

export default ExplorerFriendCard;
