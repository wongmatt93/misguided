import Card from "react-bootstrap/Card";
import "./UserCard.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import UserProfile from "../../models/UserProfile";
import { getTripsByTripIdArray } from "../../services/tripServices";
import useMutualFriends from "../../hooks/useMutualFriends";

interface Props {
  userProfile: UserProfile;
  searchProfile: UserProfile;
}

const UserCard = ({ userProfile, searchProfile }: Props) => {
  const navigate = useNavigate();
  const [totalTrips, setTotalTrips] = useState(0);
  const mutualFriends = useMutualFriends(userProfile, searchProfile);

  useEffect(() => {
    const trips: string[] = [];

    if (searchProfile.trips.length > 0) {
      searchProfile.trips.forEach((trip) => {
        if (trip.accepted) {
          trips.push(trip.tripId);
        }
      });

      getTripsByTripIdArray(trips).then((response) => {
        setTotalTrips(response.filter((trip) => trip.completed).length);
      });
    }
  }, [searchProfile]);

  const handleClick = (): void => {
    navigate(`/profile/${searchProfile.uid}`);
  };

  return (
    <Card className="UserCard">
      <Card.Body>
        <Card.Img src={searchProfile.photoURL!} />
        <Card.Title>{searchProfile.username}</Card.Title>
        {searchProfile.uid === userProfile.uid ? (
          <Card.Text>This is your profile, dumbass</Card.Text>
        ) : (
          <Card.Text>
            {mutualFriends.length} mutual friend
            {mutualFriends.length !== 1 && "s"}
          </Card.Text>
        )}
        <Card.Text>
          {totalTrips} trip{totalTrips !== 1 && "s"}
        </Card.Text>
        <Button
          variant="warning"
          onClick={handleClick}
          className="view-profile-button"
        >
          View Profile
        </Button>
      </Card.Body>
    </Card>
  );
};

export default UserCard;
