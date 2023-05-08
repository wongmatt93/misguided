import { useNavigate } from "react-router-dom";
import FullTrip from "../../models/Trip";
import "./TripMessageHeaderDesktop.css";

interface Props {
  trip: FullTrip;
}

const TripMessageHeaderDesktop = ({ trip }: Props) => {
  const navigate = useNavigate();

  const handleClick = (): void => navigate(`/trips/trip-details/${trip._id!}`);

  return (
    <div className="TripMessageHeaderDesktop">
      <h2 onClick={handleClick}>
        {trip.nickname
          ? trip.nickname.toLowerCase()
          : trip.city.cityName.toLowerCase()}
      </h2>
    </div>
  );
};

export default TripMessageHeaderDesktop;
