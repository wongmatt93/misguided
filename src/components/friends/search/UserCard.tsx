import Card from "react-bootstrap/Card";
import "./UserCard.css";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import UserProfile from "../../../models/UserProfile";
import AuthContext from "../../../context/AuthContext";

interface Props {
  searchProfile: UserProfile;
}

const UserCard = ({ searchProfile }: Props) => {
  const { userProfile } = useContext(AuthContext);
  const navigate = useNavigate();
  const [totalMutuals, setTotalMutuals] = useState(0);
  const [totalTrips, setTotalTrips] = useState(0);

  useEffect(() => {
    setTotalTrips(searchProfile.trips.length);
  }, [searchProfile]);

  const handleClick = (): void => {
    navigate(`/profile/${searchProfile.uid}`);
  };

  return (
    <Card className="UserCard">
      <Card.Body>
        <Card.Img src={searchProfile.photoURL!} />
        <Card.Title>{searchProfile.displayName}</Card.Title>
        {searchProfile.uid === userProfile!.uid ? (
          <Card.Text>This is your profile, dumbass</Card.Text>
        ) : (
          <Card.Text>
            {totalMutuals} mutual friend{totalMutuals !== 1 && "s"}
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
