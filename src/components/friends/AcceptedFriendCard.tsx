import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import UserProfile from "../../models/UserProfile";
import "./AcceptedFriendCard.css";

interface Props {
  friend: UserProfile;
}

const AcceptedFriendCard = ({ friend }: Props) => {
  const { userProfile, userTrips } = useContext(AuthContext);
  const [mutualTrips, setMutualTrips] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    let count = 0;

    userTrips.forEach((trip) => {
      trip.participants.forEach((participant) => {
        if (participant.uid === friend.uid) {
          count++;
        }
      });
    });

    setMutualTrips(count);
  }, [userTrips, friend]);

  const handleClick = (): void => {
    navigate(`/profile/${friend.uid}`);
  };

  return (
    <li className="AcceptedFriendCard" onClick={handleClick}>
      {userProfile && (
        <>
          <img src={friend.photoURL!} alt={friend.photoURL!} />
          <div className="info-container">
            <h3>{friend.displayName}</h3>
            <p>{mutualTrips} trips together</p>
          </div>
        </>
      )}
    </li>
  );
};

export default AcceptedFriendCard;
