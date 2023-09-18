import { useNavigate } from "react-router-dom";
import { Trip } from "../../../../models/Trip";
import "./ExplorerProfileTripCard.css";

interface Props {
  uid: string;
  trip: Trip;
}

const ExplorerProfileTripCard = ({ uid, trip }: Props) => {
  // variables
  const navigate = useNavigate();
  const { _id, photos, city, participants, nickname } = trip;
  const imagePath: string =
    photos.length > 0
      ? photos[0]
      : process.env.PUBLIC_URL + `/assets/cities/${city.photoURL}`;

  // functions
  const handleClick = (): void =>
    participants.some((participant) => participant.user.uid === uid)
      ? navigate(`/trips/trip-details/${_id!}`)
      : navigate(`/explorers/trip-details/${_id!}`);

  return (
    <li className="ExplorerProfileTripCard" onClick={handleClick}>
      <img src={imagePath} alt="trip" />
      <div className="info-container">
        <h3>{nickname ? nickname : city.cityName}</h3>
      </div>
    </li>
  );
};

export default ExplorerProfileTripCard;
