import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Trip from "../../models/Trip";
import "./ProfileTripCard.css";

interface Props {
  trip: Trip;
}

const ProfileTripCard = ({ trip }: Props) => {
  const navigate = useNavigate();
  const [cardImage, setCardImage] = useState("");

  useEffect(() => {
    if (trip.photos.length > 0) {
      setCardImage(trip.photos[0]);
    } else {
      setCardImage(trip.cityPhoto);
    }
  }, [trip]);

  const handleClick = (): void => navigate(`/trip/${trip._id!}`);

  return (
    <li className="ProfileTripCard" onClick={handleClick}>
      <img src={cardImage} alt={cardImage} />
      <div className="info-container">
        <h4>{trip.cityName}</h4>
      </div>
    </li>
  );
};

export default ProfileTripCard;
