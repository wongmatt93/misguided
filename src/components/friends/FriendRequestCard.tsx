import { useContext } from "react";
import { Button, ButtonGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import FriendsContext from "../../context/FriendsContext";
import UserProfile from "../../models/UserProfile";
import "./FriendRequestCard.css";

interface Props {
  request: UserProfile;
}

const FriendRequestCard = ({ request }: Props) => {
  const { userProfile } = useContext(AuthContext);
  const { handleAcceptFriend, handleDeleteFriend } = useContext(FriendsContext);
  const navigate = useNavigate();

  const handleClick = (): void => {
    navigate(`/profile/${request.uid}`);
  };

  return (
    <li className="FriendRequestCard" onClick={handleClick}>
      {userProfile && (
        <>
          <img src={request.photoURL!} alt={request.photoURL!} />
          <div className="name-button-container">
            <h3>{request.displayName}</h3>
            <ButtonGroup className="button-container">
              <Button
                variant="warning"
                onClick={() => handleAcceptFriend(userProfile.uid, request.uid)}
              >
                Accept
              </Button>
              <Button
                variant="warning"
                onClick={() => handleDeleteFriend(userProfile.uid, request.uid)}
              >
                Decline
              </Button>
            </ButtonGroup>
          </div>
        </>
      )}
    </li>
  );
};

export default FriendRequestCard;
